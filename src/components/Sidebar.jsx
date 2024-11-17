import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { SocketContext } from '../SocketContext';
import { ChatContext } from '../ChatContext';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const { logout, userData} = useContext(AuthContext)
  const { onlineUsers } = useContext(SocketContext)
  const { chatList, setSelectedChat } = useContext(ChatContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout(()=>{
        navigate('/',{ replace: true}) // navigate to login 
    }) 
  }

  return (
    <div className="w-1/3 h-screen flex flex-col bg-[#1c1d1f] border-r border-[#30353b]">
      <header className="bg-[#30353b] p-4 text-lg font-bold text-white flex justify-between items-center">
        Hello, {userData.username}
        <button 
          onClick={handleLogout} 
          className="text-sm text-[#487db5] hover:underline focus:outline-none"
        >
          Logout
        </button>
      </header>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <ul className="divide-y divide-[#30353b]">
          {chatList.map((chat) => (
            <li 
              key={chat.userId} 
              onClick={() => {setSelectedChat(chat)}} 
              className="cursor-pointer p-4 hover:bg-[#2b2e30] border-b border-transparent transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <span 
                  className={`inline-block w-3 h-3 rounded-full ${onlineUsers.includes(chat.userId,0)? 'bg-green-500' : 'bg-red-500'}`} 
                  aria-label={onlineUsers.includes(chat.userId,) ? 'Online' : 'Offline'}
                ></span>
                <span className="font-semibold text-white">{chat.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

