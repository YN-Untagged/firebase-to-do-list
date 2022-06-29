import { ref, remove } from 'firebase/database';
import moment from 'moment';
import React from 'react';
import { auth, db } from '../util/firebaseConfig';

function Task({ task, updateTask, edit }) {

    const handleChange = () => {
        const opp = !task.complete;
        task.complete = opp;
        updateTask(task);
    }
    
    const handleEditClick = () => {
        edit(task);
    }

    const handleRemoveClick = () =>{
        remove(ref(db, `/${auth.currentUser.uid}/${task.id}`));
    }

    return (
        <tr className= { task.priority === 'Low' ? (
            'task_item border-left border-success'
        ) 
        : task.priority === 'High'?(
            'task_item border-left border-danger'
        )
        : (
            'task_item border-left border-warning'
        )}
        >
            <td>
            
                <div className='form-check'>
                    
                    <input className='form-check-input'type='checkbox' checked={task.complete} onChange={handleChange} />
                    <label className='form-check-label'>
                        {task.name}<br/>
                        <small>
                        {moment(task.date).isSame(Date.now(), 'day') ?
                        (
                            <span>{ moment(task.date).format('HH:mm')}</span>
                        )
                        : moment(task.date).isSame(Date.now(), 'week') ?
                        (
                            <span> { moment(task.date).format('dddd')}</span>
                        )
                        : moment(task.date).isSame(Date.now(), 'year') ?
                        (
                            <span> { moment(task.date).format('MMMM DD')}</span>
                        )
                        :(
                            <span> { moment(task.date).format('YYYY MMMM DD')}</span>
                        )}
                    </small>
                    </label>
                </div>
            </td>
            <td >
                {moment(task.due).isSame(Date.now(), 'day') ?
                (
                    <span>Today, { moment(task.due).format('HH:mm')}</span>
                )
                : moment(task.due).isSame(Date.now(), 'week') ?
                (
                    <span> { moment(task.due).format('dddd, HH:mm')}</span>
                )
                : moment(task.due).isSame(Date.now(), 'year') ?
                (
                    <span> { moment(task.due).format('MMMM DD')}</span>
                )
                :(
                    <span> { moment(task.due).format('YYYY MMMM DD')}</span>
                )}
            </td>
            
            <td>
                <p className='d-flex justify-content-end'>
                    {
                        !task.complete ? (
                            <button type='button' className='btn btn-primary' onClick={handleEditClick}><i className='fas fa-pencil-alt'></i></button>
                        ):( <></>)
                    }
                    <button type='button' className='btn btn-danger' onClick={handleRemoveClick}><i className='fas fa-trash'></i></button>
                </p>
            </td>
            
        </tr>
    );
}

export default Task;
