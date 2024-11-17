import { createContext, useState, useEffect, useContext } from 'react'
import io from 'socket.io-client'
import { AuthContext } from './AuthContext'

export const SocketContext = createContext()

export const SocketProvider = ({children}) => {

    const [onlineUsers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(null)
    const { userData } = useContext(AuthContext)

    useEffect(()=>{
        const socketInstance = io(import.meta.env.VITE_APP_SERVER)
        setSocket(socketInstance)

        // handle online status
        socketInstance.emit('online',userData.id)

        socketInstance.on('onlineUsers', (users) => {
          setOnlineUsers(users)
        })

        socketInstance.on('userOnline', (userId) => {
          setOnlineUsers((prev) => [...prev, userId])
        })

        socketInstance.on('userOffline', (userId) => {
          setOnlineUsers((prev) => prev.filter((id) => id !== userId))
        })
        
        return ()=>{ //clean
            socketInstance.off('onlineUsers')
            socketInstance.off('userOnline')
            socketInstance.off('userOffline')
            socketInstance.disconnect()
        }
    },[])

    const joinChatRoom = (chatId) =>{
        try{
            socket.emit('join_chat', chatId)
        }catch(err){
            console.log('Please set a valid chatId for socket connection!',err)
        }
    }

    return(
        <SocketContext.Provider value={{onlineUsers, joinChatRoom }}>
            {children}
        </SocketContext.Provider>
    )
}
