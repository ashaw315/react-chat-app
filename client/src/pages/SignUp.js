import React, {useState} from "react";
import SignUpForm from '../components/SignUpForm'


function SignUp({ setUser }) {

    return(
        <div>
            <SignUpForm setUser={setUser}/>
        </div>
    )
}

export default SignUp
