import { ref, set } from 'firebase/database';
import React from 'react';
import { db, auth } from '../util/firebaseConfig';
const {v4 : uuidv4} = require("uuid");

function AddTask (){

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target,
        id = uuidv4();

        const task = {
            id: id,
            name : form.name.value,
            priority: form.priority.value,
            due: form.due.value,
            date: Date.now(),
            complete: false
        };

        set(ref(db, `/${auth.currentUser.uid}/${id}`), task);
        form.reset();  
    }

    return (
        <div className='container-fluid'>
            <form method='Post' onSubmit={handleSubmit}>
                <div className='input-group mb-3 mt-3 w-100'>
                    <div className='form-floating col-5'>
                        <input className='form-control' name='name' type='text' id='name' placeholder='Enter task' required />
                        <label htmlFor='name'>Task</label>
                    </div>
                    <div className='form-floating col-3'>
                        <select className='form-control' name='priority' id='priority' required>
                            <option value="" selected disabled hidden>Select priority</option>
                            <option value='Low'>Low</option>
                            <option value='Moderate'>Moderate</option>
                            <option value='High'>High</option>
                        </select>
                        <label htmlFor='priority'>Priority</label>
                    </div>
                    
                    <div className='form-floating col-3'>
                        <input className='form-control' name='due' type='datetime-local' min={new Date().toISOString().slice(0, 16)} id='due' required />
                        <label htmlFor='due'>Due Date</label>
                    </div>
                    
                    <button className='btn btn-primary' type='submit'>Add Task</button>
                </div>
            </form>
        </div>
    );
}

export default AddTask;
