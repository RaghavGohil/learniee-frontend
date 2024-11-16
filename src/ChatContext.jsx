import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {AuthContext} from './AuthContext'

export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {

    const [chatList, setChatList] = useState([])
    const [selectedChat, setSelectedChat] = useState()
    const [chatId, setChatId] = useState()
    const [messages, setMessages] = useState([])
    const { userData } = useContext(AuthContext)

    useEffect(() => {
        getChatList()
    }, []);
    
    const getChatList = async () => {
        // Get the chat list
        try{
            const res = await axios.get(import.meta.env.VITE_APP_SERVER + '/api/users')
            const newChatList = res.data.filter((user) => user._id !== userData.id) // if you are the user, don't draw the chat 
                .map(user => ({
                    userId: user._id,
                    name: user.username,
                    online: user.online,
                    lastMessage: user.lastMessage || 'No messages yet'
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
        console.log(messages)
        setMessages((messages)=>res.data.messages)
        setChatId(id) // use this chat id for further interactions
    }

    const sendMessage = async (content) => {
        try{
            const res = await axios.post(import.meta.env.VITE_APP_SERVER + '/api/messages/send',{
                chatId: chatId,
                senderId: userData.id,
                content:content,
            })
        }catch(err){
            console.log('Failed to send message:', err)
        } 
    }

    return (
        <ChatContext.Provider value={{ chatList, sendMessage, selectedChat, setSelectedChat, initializeChat, messages }}>
            {children}
        </ChatContext.Provider>
    );
};

