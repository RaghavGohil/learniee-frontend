import { useState } from 'react';

function ChatArea({ chat }) {
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: 'John Doe' },
    { text: 'Hi there!', sender: 'You' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'You' }]);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#1c1d1f] text-white">
      <header className="bg-[#30353b] p-4 text-lg font-bold border-b border-[#425569]">
        {chat.name}
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'You' ? 'text-right' : ''}`}>
            <span
              className={`inline-block p-2 rounded ${
                msg.sender === 'You' ? 'bg-[#487db5] text-white' : 'bg-[#2b2e30] text-gray-300'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <footer className="p-4 border-t border-[#425569] flex">
        <input
          type="text"
          className="flex-1 bg-[#2b2e30] text-white border border-[#425569] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#487db5]"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
        />
        <button onClick={sendMessage} className="bg-[#487db5] text-white p-2 rounded ml-2 hover:bg-[#425569]">
          Send
        </button>
      </footer>
    </div>
  );
}

export default ChatArea;

