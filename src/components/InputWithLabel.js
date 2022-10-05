import { useState, useEffect, useRef } from 'react';
import styles from './ToDoForm.module.css';
import PropTypes from 'prop-types';

export const InputWithLabel = ({ toDoTitle, children, onChange }) => {

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
        // removing dependency array all together allows side effect to run on mount and on update
    });

    return (
        <>
            <label htmlFor={toDoTitle} className={styles.Label}>{children}</label>
            <input 
                id={toDoTitle} 
                value={toDoTitle}
                ref={inputRef}
                onChange={onChange}
                className={styles.InputField}
            />
        </>
    )
}

InputWithLabel.propTypes = {
    toDo: PropTypes.string, 
    children: PropTypes.string,
    onTitleChange: PropTypes.func,
}