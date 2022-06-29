import React from 'react';
import {useNavigate} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../util/firebaseConfig';

function Navigator (){
    const navigate = useNavigate();

    const handleClick = () => {
        signOut(auth);
        navigate('/login');
    }
    
    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
            <div className='container-fluid'>
                <span className='navbar-brand'>Todo List</span>
                <div>
                    <span className='text-light'>Logged in as: {auth.currentUser.email} </span>
                    <button className='btn btn-danger' type='button' onClick={handleClick}>Logout</button>
                </div>
                
            </div>
        </nav>
    );
}

export default Navigator;