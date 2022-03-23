import React, {useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import Textarea from "../styles/TextArea";
import FormField from "../styles/FormField";
import Label from "../styles/Label";
import { Button } from "@mui/material";



function SignUpForm({ setUser }) {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [passwordConfirmation, setPasswordConfirmation] = useState('')
const navigate = useNavigate();

const [errors, setErrors] = useState([])

const handleUsernameChange = e => {
    setUsername(e.target.value);
  };  

const handlePasswordChange = e => {
    setPassword(e.target.value);
  };  

const handlePasswordConChange = e => {
    setPasswordConfirmation(e.target.value);
  };  


function handleSubmit(e) {
    e.preventDefault();
    const userData = new FormData();
    userData.append('username', username)
    userData.append('password', password)
    userData.append('passwordConfirmation', passwordConfirmation)
    
    fetch('/signup', {
        method: "POST",
        body: userData,
    })
    .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user))
          .then(navigate('/'))
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
      })
  };


    return(
      <div className="subforums-forum-posts">
      <Link className="forum-card" to={'/signup'}>
          <h2 className="forum-header-title">Sign Up.</h2>
      </Link>
      <Button className="go-back-button" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate(-1)}>Go Back</Button>
        <div className='signupformcontainer'>
            <form onSubmit={handleSubmit}>
              <FormField>
                <Label>Username</Label>
                <input className="signupinput"
                 id="username"
                 name="username"
                 value={username}
                 autoComplete="off"
                 type="text"
                 onChange={handleUsernameChange} 
                 />
                 </FormField>
                 <FormField>
                <Label>Password</Label>
                <input  className="signupinput"
                id="password"
                name="password"
                value={password}
                autoComplete="off"
                type="password"
                onChange={handlePasswordChange}
                />
                </FormField>
                <FormField>
                <Label>Password Confirmation</Label>
                <input className="signupinput"
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={handlePasswordConChange}
                autoComplete="off"
                />
                </FormField>
                <div className='accountbuttoncenter'>
                <input className='accountbutton' type="submit"/>
                </div>
                {errors.map((e)=><p key={e}>{e}</p>)}
            </form>
        </div>
      </div>
    )
}

export default SignUpForm