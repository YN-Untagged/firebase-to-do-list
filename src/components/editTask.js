import { ref, update } from 'firebase/database';
import React, {useState} from 'react';
import { Modal , Button} from 'react-bootstrap';
import { auth, db } from '../util/firebaseConfig';

function EditTask ({task, show, updateTask, close}) {
    try{
        const [complete, setComplete] = useState(task.complete);
    
        const handleChange = () => {
            setComplete(!complete);
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            const form = e.target;

            task.name = form.name.value;
            task.priority = form.priority.value;
            task.due = form.due.value;
            task.complete = form.complete.checked;

            updateTask(task);
        }

        const handleClose = () => {
            close();
        }

        return (
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form id='edit-form' onSubmit={handleSubmit}>
                        
                        <div className='form-floating mb-3 mt-3'>
                            <input className='form-control' name='name' type='text' defaultValue={task.name}/>
                            <label for='name'>Task</label>
                        </div>
                        <div class='form-floating mb-3 mt-3'>
                            <input className='form-control' name='due' type='datetime-local' min={new Date().toISOString().slice(0, 16)} defaultValue={task.due}/>
                            <label for='due'>Due Date</label>
                        </div>
                        <div class='form-floating mb-3 mt-3'>
                            <select className='form-control' name='priority' >
                                <option value={task.priority}>{task.priority}</option>
                                <option value='Low'>Low</option>
                                <option value='Moderate'>Moderate</option>
                                <option value='High'>High</option>
                            </select>
                            <label for='priority'>Priority</label>
                        </div>
                        <div className='form-check mb-3 mt-3'>
                            <input className='form-check-input' name='complete' type='checkbox' checked={complete} onChange={handleChange}/>
                            <label for='name'>Task Completed</label>
                        </div>
                    </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
                Close
            </Button>
            <Button variant='primary' onClick={handleClose} type='submit' form='edit-form' >
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        );
    }
    catch{
        return (
            <></>
        );
    }
}

export default EditTask;
