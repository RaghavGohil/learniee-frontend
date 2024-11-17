import { createContext, useState, useEffect, useContext, useRef } from 'react'
import EventEmitter from 'eventemitter3'
import io from 'socket.io-client'
import { AuthContext } from './AuthContext'

export const SocketContext = createContext()

export const SocketProvider = ({children}) => {

    const [onlineUsers, setOnlineUsers] = useState([])
    const socketRef = useRef(null)
    const { userData } = useContext(AuthContext)
    const messageEmitter = useRef(new EventEmitter())

    useEffect(()=>{
        socketRef.current = io(import.meta.env.VITE_APP_SERVER)
        
        // handle online status
        socketRef.current.emit('online',userData.id)

        socketRef.current.on('onlineUsers', (users) => {
            setOnlineUsers(users)
        })

        socketRef.current.on('userOnline', (userId) => {
            setOnlineUsers((prev) => [...prev, userId])
        })

        socketRef.current.on('userOffline', (userId) => {
            setOnlineUsers((prev) => prev.filter((id) => id !== userId))
        })

        // messages
        socketRef.current.on('newMessage',(message)=>{
            messageEmitter.current?.emit('newMessage',message)
        })

        return ()=>{ //clean
            socketRef.current.off('onlineUsers')
            socketRef.current.off('userOnline')
            socketRef.current.off('userOffline')
            socketRef.current.off('newMessage')
            socketRef.current.disconnect()
        }
    },[])

    const joinChatRoom = (chatId) =>{
        if(!socketRef.current){
            console.log('Socket is not initialized!')
            return
        }
        try{
            if(!chatId){
                throw new Error('Chat id is null!')
            }
            socketRef.current.emit('joinChat', chatId)
        }catch(err){
            console.log('Please set a valid chatId for socket connection!',err)
        }
    }

    const sendMessageWithSocket = async (chatId, content) => {
        try{
            const newMessage = {
                chatId: chatId,
                senderId: userData.id,
                content: content
            }
            socketRef.current.emit('sendMessage', newMessage) 
        }catch(err){
            console.log('Failed to send message:', err)
        } 
    }

    const getMessageWithSocket = async () => {

    }

    return(
        <SocketContext.Provider value={{onlineUsers, joinChatRoom, sendMessageWithSocket, messageEmitter }}>
            {children}
        </SocketContext.Provider>
    )
}
