import { createContext, useRef, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {AuthContext} from './AuthContext'
import {SocketContext} from './SocketContext'

export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {

    const [chatList, setChatList] = useState([])
    const [selectedChat, setSelectedChat] = useState()
    const chatId = useRef()
    const [messages, setMessages] = useState([])
    const { userData } = useContext(AuthContext)
    const { messageEmitter } = useContext(SocketContext)

    useEffect(() => {
        getChatList()
        messageEmitter.current?.on('newMessage',(message)=>{
            setMessages((prev)=>[...prev,message])
        })
    }, []);
    
    const getChatList = async () => {
        // Get the chat list
        try{
            const res = await axios.get(import.meta.env.VITE_APP_SERVER + '/api/users')
            const newChatList = res.data.filter((user) => user._id !== userData.id) // if you are the user, don't draw the chat 
                .map(user => ({
                    userId: user._id,
                    name: user.username,
                }))
            setChatList(newChatList)
        }catch(err){
            console.log('Unable to fetch chat list: ', err)
        }
    }

    const initializeChat = async () => {
        let res
        res = await axios.post(import.meta.env.VITE_APP_SERVER+'/api/chat/initialize',{
            userId1: userData.id,
            userId2: selectedChat.userId
        })
        const id = res.data._id // get the chat id
        res = await axios.get(import.meta.env.VITE_APP_SERVER+`/api/messages/${id}`)
        setMessages(res.data.messages)
        chatId.current = id // use this chat id for further interactions
    }

    return (
        <ChatContext.Provider value={{ chatId, chatList, selectedChat, setSelectedChat, initializeChat, messages }}>
            {children}
        </ChatContext.Provider>
    );
};

