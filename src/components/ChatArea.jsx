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
    <div className="flex-1 flex flex-col">
      <header className="bg-gray-300 p-4 text-lg font-bold">{chat.name}</header>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'You' ? 'text-right' : ''}`}>
            <span className={`inline-block p-2 rounded ${msg.sender === 'You' ? 'bg-green-200' : 'bg-gray-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <footer className="p-4 border-t flex">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          placeholder="Type a message"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => (e.key === 'Enter' ? sendMessage() : null)}
        />
        <button onClick={sendMessage} className="bg-green-500 text-white p-2 rounded ml-2">Send</button>
      </footer>
    </div>
  );
}

export default ChatArea;

