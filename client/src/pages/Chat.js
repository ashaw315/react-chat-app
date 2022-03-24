import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom"
import { createConsumer } from "@rails/actioncable"
import FormField from "../styles/FormField";
import { Button } from "@mui/material";
import Input from "../styles/Input";
import Label from "../styles/Label";
import { Box, Grid, Typography } from '@mui/material';
import ChatContent from "../components/ChatContent";
import ChatList from "../components/ChatList";


function Chat({ user }) {
    
    const params = useParams()

    const cable = useRef()
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])

    //Edited State Zone//

    const [conversations, setConversations] = useState([])
    const [currentConversation, setCurrentConversation] = useState(null)
    const [conversationUpdate, setConversationUpdate] = useState(false)


    useEffect(() => {
        let isActive = true
        fetch('/conversations')
        .then(r => r.json())
        .then(data => {
            if (isActive) {
                setConversations(data)
            }
        })
        return () => { isActive = false }
    }, [conversationUpdate])


    // function handleSubmit(e) {
    //     e.preventDefault();
    //     if (newMessage !== "") {
    //         setNewMessage('')
    //         fetch('/messages', {
    //             method: 'POSt',
    //             headers: {
    //                 'content/type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 content: newMessage,
    //                 conversation_id: params.id,
    //                 user_id: user.id,
    //             }),
    //         })
    //     }
    // }

    return (
        <div>
           <Box sx={{width: "95%", margin: "20px auto"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3.5}>
                        <ChatList setCurrentConversation={setCurrentConversation} conversations={conversations} setConversationUpdate={setConversationUpdate}/>
                    </Grid>
                    <Grid item xs={12} md={8.5}>
                        {user && currentConversation ? <ChatContent user={user} setCurrentConversation={setCurrentConversation} currentConversation={currentConversation} setConversationUpdate={setConversationUpdate} conversations={conversations} setConversations={setConversations}/> : (
                        <Box sx={{textAlign: "center"}}>
                            <Box sx={{mt: "30px"}}>
                                <Typography component="h2" variant="h4">No active chats currently selected</Typography>
                            </Box>
                        </Box>
                        )}
                    </Grid>
                </Grid>
           </Box>
        </div>
    )
}

export default Chat;

