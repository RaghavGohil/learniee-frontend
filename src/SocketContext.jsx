import { createContext, useState, useEffect, useContext } from 'react'
import io from 'socket.io-client'
import { AuthContext } from './AuthContext'

export const SocketContext = createContext()

export const SocketProvider = ({children}) => {

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)
    const { userData } = useContext(AuthContext)

    useEffect(()=>{
        const socketInstance = io(import.meta.env.VITE_APP_SERVER)
        setSocket(socketInstance) // create a new socket instance

        socketInstance.on('user_status', (data) => {
            setOnlineUsers((prevState) => {
            if (data.online) {
                return [...prevState, { userid: data.userid, online: data.online }];
            } else {
                return prevState.filter(user => user.id !== data.id);
            }
        })})

        return ()=>{
            socketInstance.disconnect()
        }
    },[])

    return(
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}
