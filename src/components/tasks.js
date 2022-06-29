import 'bootstrap/js/src/tab';
import { onValue, ref, remove, update } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { auth, db } from '../util/firebaseConfig';
import AddTask from './addTask';
import Task from './task';
import EditTask from './editTask';


function Tasks (){
    const [tasks, setTasks] = useState([]),
    [show, setShow] = useState(false),
    [eTask, setETask] = useState({}),
    userId = auth.currentUser.uid;
    
    useEffect(()=>{
        onValue(ref(db, `/${userId}`), snapshot => {
            setTasks([]);
            const data = snapshot.val();
            if(data){
                Object.values(data).map(task => {
                    setTasks((oldTasks) => [...oldTasks, task])
                })
            }
        })
    }, []);

    const updateTask = (task) => {
        update(ref(db, `/${userId}/${task.id}`), task);
    }

    const openEditModal = (task) =>{
        setETask(task);
        handleShow();
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteTasks = (e) => {
        const btn = e.target.name;
        let deletedTasks ;

        swal({
            title: "Delete " + btn +" tasks?",
            text: "Once deleted, you will not be able to recover deleted tasks.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((deleteTasks) => {
            if (deleteTasks) {
                if(btn === "all"){
                    remove(ref(db, `/${userId}`));
                }
                else if(btn === "completed"){
                    deletedTasks = tasks.filter(task => task.complete);
                    deletedTasks.forEach((item) => 
                        remove(ref(db, `/${userId}/${item.id}`))
                    );
                }
                else if(btn === "incomplete"){
                    deletedTasks = tasks.filter(task => !task.complete);
                    deletedTasks.forEach((item) => 
                        remove(ref(db, `/${userId}/${item.id}`))
                    );
                }
            } 
        });
    }

    return (
        <div>
            <AddTask />

            <div className='container-fluid'>
                <h1>Tasks</h1>
                {tasks === null || tasks === undefined || tasks.length === 0 ? (
                    <h4>You have no tasks</h4>
                )
                :(
                    <>
                        <ul className='nav nav-tabs' role='tablist'>
                            <li className='nav-item'>
                                <a className='nav-link active' data-bs-toggle='tab' href='#all'>All</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' data-bs-toggle='tab' href='#todo'>Incomplete</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' data-bs-toggle='tab' href='#complete'>Complete</a>
                            </li>
                            <div className=' col d-flex justify-content-end'>
                                <button className='btn btn-outline-info' name='incomplete' onClick={handleDeleteTasks} >Clear Incomplete</button>
                                <button className='btn btn-outline-warning' name='completed' onClick={handleDeleteTasks} >Clear Complete</button>
                                <button className= 'btn btn-outline-danger' name='all' onClick={handleDeleteTasks} >Clear All</button>
                            </div>
                        </ul>
                        <div className='tab-content'>
                            <div id='all' className='container-fluid tab-pane active'>
                                <div className='table-responsive'>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Task</th>
                                                <th>Due Date</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.map((task) => {
                                                return <Task key={task.id} task={task} updateTask={updateTask} edit={openEditModal} />
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div id='todo' className='container-fluid tab-pane fade'>
                                <div className='table-responsive'>
                                    <table className='table'>
                                        {(tasks.filter(task => !task.complete)).length === 0 ? (
                                            <h4>You have no tasks</h4>
                                        ):(
                                            <>
                                                <thead>
                                                    <tr>
                                                        <th>Task</th>
                                                        <th>Due Date</th>
                                                        <th></th>
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {(tasks.filter(task => !task.complete)).map((task) => {
                                                        return <Task key={task.id} task={task} updateTask={updateTask} edit={openEditModal} />
                                                    })}
                                                </tbody>  
                                            </>  
                                        )}
                                    </table>
                                </div>
                            </div>
                            <div id='complete' className='container-fluid tab-pane fade'>
                                <div className='table-responsive'>
                                    <table className='table'>
                                        {(tasks.filter(task => task.complete)).length === 0 ? (
                                            <tr><h4>You have no tasks</h4></tr>
                                        ):(
                                            <>
                                                <thead>
                                                    <tr>
                                                        <th>Task</th>
                                                        <th>Due Date</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(tasks.filter(task => task.complete)).map((task) => {
                                                        return <Task key={task.id} task={task} updateTask={updateTask} edit={openEditModal} />
                                                    })}
                                                </tbody>  
                                            </>  
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                        <EditTask task = {eTask} updateTask = {updateTask} close={handleClose} show={show}/>
                    </>
                )}
            </div>
        </div>
    );
}

export default Tasks;
