import { useState, useEffect } from 'react'
import axios from 'axios'

function Sidebar({ setActiveChat }) {

    const [chats,setChats] = useState([])   

    useEffect(()=>{

        //Get the chat list 
        axios({
            url: import.meta.env.VITE_APP_SERVER+'/api/users',
            method: "GET",
        })
        .then((res) => {

            const newList = []
            
            for(let i=0;i<res.data.length;i++){
                const item = {
                    "id":res.data[i]._id, // the chat id
                    "name":res.data[i].username, // the name of the person
                    "online":res.data[i].online, // is the person online?
                    "lastMessage":res.data[i].lastNessage // the last message sent by the person
                }
                newList.push(item)
            }  

            setChats((data) => 
                [...data, ...newList]
            )

        })
        .catch((err) => {
            console.log('Unable to fetch chat list: ', err)
        });  

    },[]) //add reload

    return (
      <div className="w-1/3 bg-gray-100 border-r">
        <header className="bg-gray-300 p-4 text-lg font-bold">Learniee Chat App</header>
        <ul>
          {chats.map((chat,index)=> (
            <li key={chat.id} onClick={() => setActiveChat(chat)} className="cursor-pointer p-4 hover:bg-gray-200 border-b">
              <div className="font-semibold">{chat.name} ({chat.online? "Online":"Offline"})</div>
              <div className="text-sm text-gray-500">{chat.lastMessage}</div>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Sidebar;
