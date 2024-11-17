import { useState, useEffect, useContext, useRef } from 'react'
import { AuthContext } from '../AuthContext'
import { ChatContext } from '../ChatContext'
import { SocketContext } from '../SocketContext'

function ChatArea() {

  const [input, setInput] = useState('')
  const { userData } = useContext(AuthContext)
  const { messages, initializeChat, chatId, selectedChat, sendMessage } = useContext(ChatContext)
  const { joinChatRoom } = useContext(SocketContext)
  const scrollRef = useRef(null)


  const handleSendMessage = () => {
    if(input) {
      sendMessage(input)
      setInput('')
    }
  }
  
  useEffect(()=>{
      if(selectedChat){// initialize the chat if a new chat is selected and join the room
          initializeChat()
          joinChatRoom(chatId)
          scrollRef.current?.scrollIntoView() // also scroll to bottom
      }   
  },[selectedChat])

  useEffect(()=>{ // auto scroll whenever the messages is updated
      scrollRef.current?.scrollIntoView()
  },[messages])

  if(!selectedChat)
  {
    return(<div className="flex-1 flex items-center bg-[#1c1d1f] justify-center text-gray-400">Select a chat to start messaging</div>)
  }

  return (
    <div className="flex-1 flex flex-col bg-[#1c1d1f] text-white">
      <header className="bg-[#2b2e30] p-4 text-lg font-bold">
        {selectedChat.name}
      </header>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.senderId === userData.id ? 'text-right' : ''}`}>
            <span
              className={`inline-block p-2 rounded ${
                msg.senderId === userData.id ? 'bg-[#487db5] text-white' : 'bg-[#2b2e30] text-gray-300'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      <div ref={scrollRef}></div>
      </div>
      <footer className="p-4 border-t border-slate-700 flex">
        <input
          type="text"
          className="flex-1 bg-[#2b2e30] text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#487db5]"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? handleSendMessage() : null)}
        />
        <button onClick={handleSendMessage} className="bg-[#30353b] text-white ml-2 p-2 rounded hover:bg-[#2b2e30]">
          Send
        </button>
      </footer>
    </div>
  )
}

export default ChatArea

