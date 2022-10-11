import { useState } from 'react';
import { InputWithLabel } from './InputWithLabel';
import styles from './ToDoForm.module.css';
import PropTypes from 'prop-types';

export const AddToDoForm = ({onAddToDo}) => {
    const [ toDoTitle, setToDoTitle ] = useState("");
    
    // handle data entered into input element, use to set toDoTitle
    const handleTitleChange = (e) => {
        let newToDoTitle = e.target.value;
        setToDoTitle(newToDoTitle);
        e.target.value='';
    }

    // callback function passing toDoTitle back up to App addToDo functioon
    const handleAddToDo = (e) => {
        e.preventDefault();
        onAddToDo({title: toDoTitle})
        setToDoTitle("");
    };

    return (
        <form className={styles.AddToDoForm} onSubmit={handleAddToDo}>
            <InputWithLabel 
                toDoTitle={toDoTitle} 
                onChange={handleTitleChange}
                >
                Title: 
            </InputWithLabel>
            <button type="submit" className={styles.AddItemButton}>Add</button>
        </form>
    )
}

AddToDoForm.propTypes = {
    onAddToDo: PropTypes.func,
}