import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, IconButton, Modal} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useParams } from 'react-router-dom'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: "center"
  };


function ChatDelete({ currentConversation, setConversationUpdate, setCurrentConversation, onDeleteConvo }) {
  const [conversation, setConversation] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
      setOpen(false)
  };

  const {id} = useParams();

  useEffect(() => {
      fetch(`/conversations/${id}`)
      .then(r => r.json())
      .then(data => {
          setConversation(data)
      })
  }, [id])

  function handleDelete () {
    fetch(`/conversations/${currentConversation.id}`, {
        method: "DELETE"
    }).then(res => {
        onDeleteConvo(currentConversation)
        // setConversationUpdate(update => !update)
        setCurrentConversation(null)
    })
  }

  console.log(currentConversation.id)

    return (
        <div>
            <IconButton onClick={handleOpen} sx={{position: "absolute", left: "2px", top: "2px"}} >
                <ClearIcon color="secondary" sx={{ fontSize: 30 }}/>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    
                    <Typography sx={{mb: "25px"}} component="h1" variant="h6">Are you sure you want to delete this conversation and all message history?</Typography>
                    <Button variant="outlined" size="small" onClick={handleDelete} sx={{mr: "10px"}}>Delete</Button>
                    <Button variant="outlined" size="small" onClick={handleClose}>Cancel</Button>
                </Box>
        </Modal>
        </div>
    )
}

export default ChatDelete;