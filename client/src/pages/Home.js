import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
// import './Home.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ThreeD from '../components/ThreeD';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 700,
    bgcolor: 'background.paper',
    border: '5px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function Home({user, setUser}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username, password
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) =>{ 
                        setUser(user);
                    });
                } else {
                    r.json().then((err) => {
                        setErrors(err.errors);
                    })
                }
            });
    }
    
    if (user) {
        return (
            <div className='homepagedivloggedin'>
                <div className='homepagecontainerloggedin'>
                    <div className='homepageloggedinleft'>
                        <h2 className='homepageh2loggedin'>Welcome, {user.username}.</h2>
                        <p className='homepageploggedin'>Enjoy your visit.</p>
                        <h3 className='homepageh3loggedin'>Not sure where to begin?</h3>
                        {/* <div className='homepageoptionsdivloggedin'>
                            <Link className='homepagelinkloggedin' to='/forums'>Check out the forums.</Link>
                        </div>
                        <div className='homepageoptionsdivloggedin'>
                            <Link className='homepagelinkloggedin' to='/account'>Update your account.</Link>
                        </div>
                        <div className='homepageoptionsdivloggedin'>
                            <Link className='homepagelinkloggedin' to='/profile'>View your profile.</Link>
                        </div> */}
                        <ThreeD />
                    </div>
                </div>
                <div className="footer-position">
                <div className='homepagefooter-subforum'>
                            <h3 className='footerheader'>About</h3>
                            <h3  className='footerheader1'>Contact</h3>
                        </div>
                            <ul className='footerul'>
                                <div className='footerp'>Rare NY is a conceptual project by adamshaw.</div>
                                <div className='footerp1'>Resources for Artists Everywhere looks to offer artists a space to communicate and share resources.</div>
                                <a className='footerp2' href="mailto:info.rareny@gmail.com">Email Us</a>  
                            </ul>
                </div>
            </div>
        )
    } 
        else {
            return (
                <div className='homepagediv'>
                    <div className='homepagecontainersignedout'>
                        <div className='homepagesignedoutleft'>
                            <h2 className='homepageh2signedout'>RARE NY</h2>
                            <p className='homepagepsignedout'>Resources for Artist Everywhere.</p>
                            {/* <button onClick={handleLogInForm} className='homepagebuttonsignedout'>Log In</button><p className='homepagedividersignedout'>|</p><Link className='homepagelinksignedout' to='/signup'>Sign Up</Link> */}
                            <div>
                            <Button sx={{ color: "black" }} onClick={handleOpen}>Login</Button>
                            <Link className='loginlink' to='/signup'>
                                <Button className='loginbutton' sx={{ color: "black"}}>SIGN UP</Button>
                            </Link>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                        
                            >
                                <Box  className="box" sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                Welcome back
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <form className="form" onSubmit={handleSubmit}>
                                    <span>
                                        <p className='loginp'>Please log in.</p>
                                     </span>
                                    <p className='logintitle'>Username</p>
                                    <div className='logininputdiv'>
                                        <input className='logininput'
                                        type='text'
                                        autoComplete='off'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <p className='logintitle'>Password</p>
                                    <div className='logininputdiv1'>
                                        <input className='logininput'
                                            type='password'
                                            autoComplete='off'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="loginbuttonmodal">
                                        <Button className='loginbuttonmodal' type="submit" sx={{ color: "black", border: "2px black solid"}}>LOGIN</Button>
                                    </div>
                                    <div className="loginbuttonmodal"> 
                                    {errors.map((e)=><p key={e}>{e}</p>)}
                                    </div>
                                <p className="signuplink">Don't have an account?</p>
                            <Link className='loginlink' to='/signup'>
                                <Button className='signupbutton' sx={{ color: "black", width: "50%", border: "2px black solid" }}>SIGN UP</Button>
                            </Link>
                        </form>
                                </Typography>
                                </Box>
                            </Modal>
                            </div>                       
                        </div>
                    </div>
                        <div className='homepagefooter'>
                            <h3 className='footerheader'>About</h3>
                            <h3  className='footerheader1'>Contact</h3>
                        </div>
                        {/* <div className='homepagefooter'> */}
                            <ul className='footerul'>
                                <div className='footerp'>Rare NY is a conceptual project by adamshaw.</div>
                                <div className='footerp1'>Resources for Artists Everywhere looks to offer artists a space to communicate and share resources.</div>
                                <a className='footerp2' href="mailto:info.rareny@gmail.com">Email Us</a> 
                            </ul>
                        {/* </div> */}
            </div>
            )
        }
  }

  export default Home;