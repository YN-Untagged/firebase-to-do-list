import React, { useState, useEffect } from 'react';
import { auth } from '../util/firebaseConfig';
import Login from './login';
import Navigator from './navigator';
import Tasks from './tasks';

function Home(){

    const [user, setUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged((currUser) => {
            if(currUser){
                setUser(currUser);
            }
        });
    }, []);

    return (
        user ?( 
            <>
                <Navigator />
                <Tasks />
            </>
            
        )
        :(
            <Login /> 
        )
    );
}

export default Home;
