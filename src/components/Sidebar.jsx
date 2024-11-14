import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

function Sidebar({ setActiveChat }) {
  const [chats, setChats] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    // Get the chat list
    axios({
      url: import.meta.env.VITE_APP_SERVER + '/api/users',
      method: "GET",
    })
      .then((res) => {
        const newList = res.data.map(user => ({
          id: user._id,
          name: user.username,
          online: user.online,
          lastMessage: user.lastMessage || 'No messages yet'
        }));

        setChats(newList);
      })
      .catch((err) => {
        console.log('Unable to fetch chat list: ', err);
      });
  }, []);

  return (
    <div className="w-1/3 bg-[#1c1d1f] border-r border-[#30353b]">
      <header className="bg-[#30353b] p-4 text-lg font-bold text-white flex justify-between items-center">
        Learniee Chat App
        <button 
          onClick={logout} 
          className="text-sm text-[#487db5] hover:underline focus:outline-none"
        >
          Logout
        </button>
      </header>
      <ul className="divide-y divide-[#30353b]">
        {chats.map((chat) => (
          <li 
            key={chat.id} 
            onClick={() => setActiveChat(chat)} 
            className="cursor-pointer p-4 hover:bg-[#2b2e30] border-b border-transparent transition-colors duration-200"
          >
            <div className="flex items-center space-x-2">
              <span 
                className={`inline-block w-3 h-3 rounded-full ${chat.online ? 'bg-green-500' : 'bg-gray-500'}`} 
                aria-label={chat.online ? 'Online' : 'Offline'}
              ></span>
              <span className="font-semibold text-white">{chat.name}</span>
            </div>
            <div className="text-sm text-gray-400">{chat.lastMessage}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;

