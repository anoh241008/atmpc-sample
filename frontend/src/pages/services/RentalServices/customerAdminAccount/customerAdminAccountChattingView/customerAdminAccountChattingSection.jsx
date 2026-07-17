import React, { useState, useEffect, useCallback, useRef } from "react";
import useChatRoom from "../../../../../hooks/services/RentalServices/ChatRoom/ChatRoom";
import { getOrCreateConversationAsTenant } from "../../../../../api/services/RentalServices/chat/ChatManagement";
import api from "../../../../../api/axiosInstance";

const CustomerAdminAccountChattingSection = () => {
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [adminid, setAdminid] = useState(null);
  const [adminOnline, setAdminOnline] = useState(false);

  const isResolvingRef = useRef(false);
  const scrollRef = useRef(null);

  const { messages, sendMessage, subscribeToPresence, loadMore, hasMore, loadingMore } = useChatRoom(
    conversationId,
    currentUserId
  );

  useEffect(() => {
    const resolveIdentity = async () => {
      try {
        const meRes = await api.get("/apiTenant/me");
        const tenant = meRes?.data;
        setCurrentUserId(tenant?.customerid || null);

        if (tenant?.branch) {
          const adminRes = await api.get(`/api/rental/admin/byBranch/${tenant.branch}`);
          setAdminid(adminRes?.data?.userid || null);
        }
      } catch (err) {
        console.error("Failed to resolve tenant identity", err);
      }
    };

    resolveIdentity();
  }, []);

  useEffect(() => {
    const resolveConversation = async () => {
      if (isResolvingRef.current || !adminid) return;
      isResolvingRef.current = true;

      try {
        const res = await getOrCreateConversationAsTenant(adminid);
        setConversationId(res?.data?.conversationid || res?.data?.data?.conversationid || null);

        const presenceRes = await api.get(`/chatMessage/presence/${adminid}`);
        setAdminOnline(presenceRes?.data?.online || false);
      } catch (err) {
        console.error("Failed to resolve conversation", err);
      } finally {
        isResolvingRef.current = false;
      }
    };

    resolveConversation();
  }, [adminid]);

  useEffect(() => {
    if (!adminid || !subscribeToPresence) return;

    const unsubscribe = subscribeToPresence(adminid, (online) => {
      setAdminOnline(online);
    });

    return unsubscribe;
  }, [adminid, subscribeToPresence]);

  const handleSend = () => {
    if (!input.trim() || !conversationId) return;
    sendMessage(input, adminid);
    setInput("");
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    if (el.scrollTop === 0 && hasMore && !loadingMore) {
      const prevHeight = el.scrollHeight;

      loadMore().then(() => {
        requestAnimationFrame(() => {
          const newHeight = el.scrollHeight;
          el.scrollTop = newHeight - prevHeight;
        });
      });
    }
  };

  return (
    <div className="mt-28 max-w-3xl mx-3 lg:mx-auto md:mx-auto font-oswald px-4 mb-10">

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

        <div className="bg-green-700 px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            L
          </div>
          <div>
            <p className="text-white font-bold text-sm tracking-tight">Landlord</p>
            <p className={`text-xs flex items-center gap-1 ${adminOnline ? "text-green-200" : "text-gray-300"}`}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${adminOnline ? "bg-green-300" : "bg-gray-400"}`}
              />
              {adminOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-96 overflow-y-auto p-5 bg-gray-50 space-y-3"
        >
          {loadingMore && (
            <div className="text-center text-[10px] text-gray-400 py-2">
              Loading older messages...
            </div>
          )}

          {messages.map((msg) => {
            const isMine = msg.senderid === currentUserId;

            return (
              <div
                key={msg.messageid}
                className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                    isMine
                      ? "bg-green-700 text-white rounded-tl-2xl rounded-tr-xl rounded-bl-2xl rounded-br-sm"
                      : "bg-white text-gray-700 border border-gray-100 rounded-tr-2xl rounded-tl-xl rounded-br-2xl rounded-bl-sm"
                  }`}
                >
                  {msg.message}
                </div>

                {isMine && (
                  <span className="text-[10px] text-gray-400 mt-0.5 px-1">
                    {msg.status === "READ"
                      ? "Read"
                      : msg.status === "DELIVERED"
                      ? "Delivered"
                      : "Sent"}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-100 flex items-center gap-3 p-4 bg-white">
          <input
            type="text"
            className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 placeholder-gray-400"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-5 py-2.5 bg-green-700 text-white text-xs font-bold rounded-full hover:bg-green-800 transition duration-300 shadow-sm flex-shrink-0"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomerAdminAccountChattingSection;