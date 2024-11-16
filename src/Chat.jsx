import { useContext } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import {SocketProvider} from './SocketContext'
import {ChatProvider} from './ChatContext'

function Chat() {

  return (
      <SocketProvider>
        <ChatProvider>
            <div className="flex h-screen bg-gray-200">
              <Sidebar/>
              <ChatArea/>
            </div>
        </ChatProvider>
      </SocketProvider>
  );
}

export default Chat;
