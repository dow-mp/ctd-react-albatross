import { useState } from 'react';
import { InputWithLabel } from './InputWithLabel';
import styles from './ToDoForm.module.css';
import PropTypes from 'prop-types';

export const AddToDoForm = ({onAddToDo}) => {
    // establish toDoTitle as a stateful variable and set the initial state
    const [ toDoTitle, setToDoTitle ] = useState("");

    const handleTitleChange = (e) => {
        console.log('input target value: ' + e.target.value);
        // update the state of toDoTitle to equal the value of newToDoTitle
        let newToDoTitle = e.target.value;
        setToDoTitle(newToDoTitle);
    }

    const handleAddToDo = (e) => {
        // prevent the form submission from refreshing the entire page (which would be the default behavior)
        e.preventDefault();
        console.log(e.target.value); //returns undefined!!!
        //CALL BACK the "addToDo" that was declared in App to update state with a new to do list item - this is where the data collected here (toDoTitle) is able to pass back up to App via the callback handler
        onAddToDo({title: toDoTitle})
            // {title: toDoTitle,}
            // id: toDoTitle.concat(Date.now()),
       
        // console.log(toDoTitle);
        // reset the value of the input field to a blank string after submit
        setToDoTitle("");
    };

    return (
        <form className={styles.AddToDoForm} onSubmit={handleAddToDo}>
            <InputWithLabel toDo={toDoTitle} onTitleChange={handleTitleChange}>
                Title: 
            </InputWithLabel>
            <button type="submit" className={styles.AddItemButton}>Add</button>
        </form>
    )
}

AddToDoForm.propTypes = {
    onAddToDo: PropTypes.func,
}