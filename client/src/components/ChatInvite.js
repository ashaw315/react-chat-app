import React, {useState, useEffect} from "react";
import { Box, Button, Typography, Modal, IconButton, List, ListItem, ListItemText, ListItemAvatar, Divider,TextField } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

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

function ChatInvite({ user, users, currentConversation, setConversationUpdate}) {
  const [open, setOpen] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [errors, setErrors] = useState(null)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
      setOpen(false)
      setShowUpdate(false)
  };

  function handleSearch (event) {
    setSearchValue(event.target.value)
  }

  function handleInvite (event) {
    fetch("/conversation-invite", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: users.find((user) => user.username === event.target.innerText).id,
            conversation_id: currentConversation.id
        })
    })
    .then(r => {
        if (r.ok) {
            r.json().then(res => {
                setOpen(true)
                setShowUpdate(true)
                setConversationUpdate(isUpdate => !isUpdate)
            })
        }
        else {
            r.json().then((err) => {
                setShowUpdate(false)
                setErrors(err.errors)
            })
        }
    })            
  }

  const filteredUsers = users.filter(user => user.username.toLowerCase().startsWith(searchValue.toLowerCase())).filter(otherUser => otherUser.username !== user.username)

    return (
        <div>
            <IconButton onClick={handleOpen} sx={{position: "absolute", right: "2px", top: "2px"}} >
                <GroupAddIcon color="secondary" sx={{ fontSize: 30 }}/>
            </IconButton>
            <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        
                        <Typography component="h1" variant="h5">Invite people</Typography>
                        <TextField
                            margin="normal"
                            label="Search User..."
                            name="title"
                            variant="outlined"
                            size="small"
                            onChange={handleSearch}
                            value={searchValue}
                            fullWidth
                            color="secondary"
                        />
                        {errors ? errors.map((e) => <Typography key={e} variant="subtitle1" component="h2" gutterBottom sx={{color: "red"}}>{e} </Typography>) : null}
                        {showUpdate ? <h4>User invited to conversation!</h4> : null}
                        <Box sx={{ borderRadius: "5px", maxHeight: "60vh", overflow: "auto"}}>
                            <List sx={{margin: "auto", width: "90%"}}>
                                {filteredUsers.map((user) => {
                                    return (
                                    <ListItem onClick={handleInvite} key={user.id} sx={{backgroundColor: "black", '&:hover': {backgroundColor: "#14a37f"}}}>
                                        <div>
                                            <h3>{user.username}</h3>
                                        </div>
                                        <ListItemText primary={user.username} sx={{color: "white", cursor: "pointer", padding: "5px"}}/>
                                        <Divider />
                                    </ListItem>
                                    )
                                })}
                            </List>
                        </Box>
                        <Button onClick={handleClose} sx={{position: "absolute", right: "0px"}}>CLOSE</Button>
                    </Box>
            </Modal>
        </div>
    )
}

export default ChatInvite;