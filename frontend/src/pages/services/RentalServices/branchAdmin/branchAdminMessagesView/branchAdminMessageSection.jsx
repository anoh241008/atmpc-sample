import React, { useState, useCallback, useRef, useEffect } from "react";
import useChatManagement from "../../../../../hooks/services/RentalServices/ChatRoom/ChatManagement";
import useChatRoom from "../../../../../hooks/services/RentalServices/ChatRoom/ChatRoom";
import { getOrCreateConversation } from "../../../../../api/services/RentalServices/chat/ChatManagement";
import api from "../../../../../api/axiosInstance"; // adjust path to match your project structure

const BranchAdminAccountChattingSection = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [input, setInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const { tenantList } = useChatManagement();

  const scrollRef = useRef(null);
  const isResolvingRef = useRef(false);

  // Resolve the logged-in admin's own ID via the backend (HttpOnly cookie, can't decode client-side)
  useEffect(() => {
    const fetchCurrentAdmin = async () => {
      try {
        const res = await api.get("/api/rental/admin/me");
        setCurrentUserId(res?.data?.userid || null);
      } catch (err) {
        console.error("Failed to resolve current admin", err);
      }
    };

    fetchCurrentAdmin();
  }, []);

  const { messages, sendMessage, loadMore, hasMore, loadingMore } = useChatRoom(
    conversationId,
    currentUserId
  );

  const handleSelectUser = useCallback(async (customerid) => {
    if (isResolvingRef.current) return;
    isResolvingRef.current = true;

    setSelectedUser(customerid);
    setConversationId(null);

    try {
      const res = await getOrCreateConversation(customerid);
      setConversationId(res?.data?.conversationid || res?.data?.data?.conversationid || null);
    } catch (err) {
      console.error("Failed to resolve conversation", err);
    } finally {
      isResolvingRef.current = false;
    }
  }, []);

  const handleSend = () => {
    if (!input.trim() || !selectedUser) return;
    sendMessage(input, selectedUser);
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
    <div className="flex justify-center bg-gray-100 px-2 py-4 h-screen">
      <div
        className="w-full max-w-5xl flex border rounded-lg shadow-md overflow-hidden"
        style={{ height: "600px" }}
      >
        {/* Sidebar */}
        <div
          className={`
            w-full md:w-60 bg-white border-r overflow-y-auto
            ${selectedUser ? "hidden md:block" : "block"}
          `}
        >
          <div className="sticky top-0 bg-green-500 text-white px-3 py-2 text-sm font-semibold">
            Renters
          </div>

          <ul>
            {tenantList.map((renter) => (
              <li
                key={renter.customerid}
                onClick={() => handleSelectUser(renter.customerid)}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-green-100 transition"
              >
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0">
                  <img
                    src={
                      renter.profilephoto
                        ? `${import.meta.env.VITE_API_PHOTO_URL}${renter.profilephoto}`
                        : "https://placehold.co/150x150"
                    }
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>

                <span className="truncate text-black text-sm font-medium">
                  {renter.fullname}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Panel */}
        <div
          className={`
            flex-1 flex flex-col bg-white
            ${selectedUser ? "flex" : "hidden md:flex"}
          `}
        >
          {/* Header */}
          <div className="bg-green-500 text-white px-3 py-2 text-sm font-semibold flex items-center justify-between">
            <span>
              Chat with{" "}
              {tenantList.find((r) => r.customerid === selectedUser)?.fullname}
            </span>

            <button
              onClick={() => setSelectedUser(null)}
              className="md:hidden bg-white text-green-600 px-2 py-1 rounded text-xs"
            >
              ← Back
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-2"
          >
            {loadingMore && (
              <div className="text-center text-[10px] text-gray-400 py-2">
                Loading older messages...
              </div>
            )}

            {messages.map((msg) => {

              const isMine = String(msg.senderid) === String(currentUserId);

              return (
                <div
                  key={msg.messageid}
                  className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`px-3 py-2 max-w-xs break-words text-xs shadow-sm ${
                      isMine
                        ? "bg-green-400 text-gray-800 rounded-lg"
                        : "bg-white text-gray-800 border border-gray-200 rounded-lg"
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

          {/* Input */}
          <div className="border-t flex items-center p-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-gray-300 bg-white rounded-full px-3 py-2 text-xs focus:outline-none text-black"
              placeholder="Type a message..."
            />

            <button
              onClick={handleSend}
              className="ml-2 px-3 py-2 bg-green-500 text-white text-xs rounded-full hover:bg-green-800"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchAdminAccountChattingSection;