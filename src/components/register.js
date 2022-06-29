import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../util/firebaseConfig';
import swal from 'sweetalert';

function Register(){
    const navigate = useNavigate();
    const [disabled, setDisabled ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target,
        email = form.email.value,
        password = form.password.value,
        cpassword = form.cpassword.value;

        if(password === cpassword){
            createUserWithEmailAndPassword(auth, email, password).then(() => {
                setDisabled(false);
                navigate('/');
            }).catch((err) => {
                setDisabled(false);
                swal({
                    title: "Registration unsuccessful!",
                    text: err.message,
                    icon: "error"
                });
            })
        }
        else{
            swal({
                title: "Registration unsuccessful!",
                text: "Passwords don't match.",
                icon: "error"
            });
        }

    }

    return (
        <div className='container mt-5'>
            <form id='login-form' onSubmit={handleSubmit} className='login_form text-center border'>
                <h1 className='mb-5 mb-5'>Register</h1>
                <fieldset disabled={disabled}>
                    <div className='input-group mb-5'>	
                        <span className='input-group-text'><i className='fas fa-envelope'></i></span>
                        <input className='form-control form-control-lg' type='email' name='email' placeholder='Email' id='email' required />
                    </div>

                    <div className='input-group mb-5'>
                        <span className='input-group-text'><i className='fas fa-lock'></i></span>
                        <input className='form-control form-control-lg' type='password' name='password' placeholder='Password' required />
                    </div>

                    <div className='input-group mb-5'>
                        <span className='input-group-text'><i className='fas fa-lock'></i></span>
                        <input className='form-control form-control-lg' type='password' name='cpassword' placeholder='Confirm Password' required />
                    </div>
                    
                    <button className='btn btn-dark btn-lg' type='submit' id='login-btn'>Register</button><br/>
                    <span>Don't have an account? <Link to='/login'>Click here to login.</Link></span>
                </fieldset>
            </form>
        </div>
    );
}

export default Register;
