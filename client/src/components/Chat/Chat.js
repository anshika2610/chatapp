import React, {useState,useEffect } from 'react'; 
 import queryString from 'query-string';
 import io from 'socket.io-client'
 import './Chat.css'


 import Messages from '../Messages/Messages';
 import Infobar from '../Infobar/Infobar'
 import Input from '../Input/Input'


 

 let socket;

 
const Chat = ({location}) => {
const [name,setName] =useState('');
const [room, setRoom] = useState('');
const [message, setMessage] = useState('');
const [messages, setMessages] = useState([]);
const ENDPOINT='localhost:5000';

    useEffect(()=>{
        const {name, room} =queryString.parse(location.search)
        socket=io('localhost:5000');
        setName(name);
        setRoom(room);
         socket.emit('join',{name,room},error => { 
             alert(error);
        });
        return()=>{
            socket.emit('disconnect');
            socket.off(); 
        }

   },[ENDPOINT ,location.search]);

   useEffect(()=> 
    {
        socket.on('message',(message)=>
        {
             setMessages([...messages,message]);
        })
    },[messages]); 

    const sendMessage =(event)=>
    {
        event.preventDefault();
        if(message)
        {
            socket.emit('sendMessage', message,()=> setMessage(''));
        }
    }
         console.log(message,messages);
    return (
        <div className="outerContanier">
            <div  className="Contanier">
         <Infobar room={room} />
         <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
         <Messages messages={messages} name={name} />
         
             </div>
             {/* <TextContainer users={users}/> */}
        </div>
    )

}
export default Chat;  