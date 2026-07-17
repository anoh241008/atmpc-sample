// hooks/services/RentalServices/ChatRoom/ChatRoom.js
import { useState, useEffect, useRef, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {
  getConversationMessagesPaged,
  markAllRead,
} from "../../../../api/services/RentalServices/chat/ChatManagement";

const useChatRoom = (conversationId, currentUserId) => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!conversationId) return;

    setMessages([]);
    setPage(0);
    setHasMore(true);

    const loadInitial = async () => {
      try {
        const res = await getConversationMessagesPaged(conversationId, 0, 30);
        const content = res?.data?.content || [];

        const reversed = content.slice().reverse();
        setMessages(reversed);
        setHasMore(!res?.data?.last);

        const hasIncoming = reversed.some((m) => m.senderid !== currentUserId);

        if (hasIncoming) {
          await markAllRead(conversationId);

          setMessages((prev) =>
            prev.map((m) =>
              m.senderid !== currentUserId ? { ...m, status: "READ" } : m
            )
          );
        }
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    loadInitial();
  }, [conversationId, currentUserId]);

  const loadMore = useCallback(async () => {
    if (!conversationId || loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      const res = await getConversationMessagesPaged(conversationId, nextPage, 30);
      const content = res?.data?.content || [];

      setMessages((prev) => [...content.slice().reverse(), ...prev]);
      setPage(nextPage);
      setHasMore(!res?.data?.last);
    } catch (err) {
      console.error("Failed to load more messages", err);
    } finally {
      setLoadingMore(false);
    }
  }, [conversationId, page, hasMore, loadingMore]);

  useEffect(() => {
    if (!conversationId) return;

    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${import.meta.env.VITE_API_URL}/ws`, null, {
          withCredentials: true,
        }),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/conversation/${conversationId}`, (frame) => {
          const newMsg = JSON.parse(frame.body);

          // Avoid duplicating the message if it's our own optimistic one already shown
          setMessages((prev) => {
            const alreadyExists = prev.some(
              (m) =>
                m.message === newMsg.message &&
                m.senderid === newMsg.senderid &&
                String(m.messageid).startsWith("temp-")
            );

            if (alreadyExists) {
              // Replace the optimistic temp message with the real one from the server
              return prev.map((m) =>
                String(m.messageid).startsWith("temp-") &&
                m.message === newMsg.message &&
                m.senderid === newMsg.senderid
                  ? newMsg
                  : m
              );
            }

            return [...prev, newMsg];
          });

          if (newMsg.senderid !== currentUserId) {
            markAllRead(conversationId);
          }
        });

        client.subscribe(`/topic/conversation/${conversationId}/status`, (frame) => {
          const update = JSON.parse(frame.body);
          if (update.status === "READ") {
            setMessages((prev) =>
              prev.map((m) =>
                m.senderid === currentUserId ? { ...m, status: "READ" } : m
              )
            );
          }
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [conversationId, currentUserId]);

  const sendMessage = useCallback(
    (text, receiverId) => {
      if (!clientRef.current?.connected) return;

      const optimisticMessage = {
        messageid: `temp-${Date.now()}`,
        senderid: currentUserId,
        receiverid: receiverId,
        message: text,
        status: "SENT",
      };

      setMessages((prev) => [...prev, optimisticMessage]);

      clientRef.current.publish({
        destination: "/app/chat.send",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          conversationid: conversationId || null,
          receiverid: receiverId,
          message: text,
        }),
      });
    },
    [conversationId, currentUserId]
  );

  const subscribeToPresence = useCallback((userid, callback) => {
    if (!clientRef.current?.connected) return () => {};

    const sub = clientRef.current.subscribe(`/topic/presence/${userid}`, (frame) => {
      const data = JSON.parse(frame.body);
      callback(data.online);
    });

    return () => sub.unsubscribe();
  }, []);

  return {
    messages,
    sendMessage,
    loadMore,
    hasMore,
    loadingMore,
    subscribeToPresence,
  };
};

export default useChatRoom;