import { useContext } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import {SocketProvider} from './SocketContext'
import {ChatProvider} from './ChatContext'

function Chat() {

  return (
    <ChatProvider>
      <SocketProvider>
            <div className="flex h-screen bg-gray-200">
              <Sidebar/>
              <ChatArea/>
            </div>
      </SocketProvider>
    </ChatProvider>
  );
}

export default Chat;
