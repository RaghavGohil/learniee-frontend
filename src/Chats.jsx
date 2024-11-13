import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

function Chat() {
  const [activeChat, setActiveChat] = useState(null);
  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar setActiveChat={setActiveChat} />
      {activeChat ? <ChatArea chat={activeChat} /> : <div className="flex-1 flex items-center justify-center">Select a chat to start messaging</div>}
    </div>
  );
}

export default Chat;
