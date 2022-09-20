import { useState, useEffect, useRef } from 'react';
import styles from './ToDoForm.module.css';

export const InputWithLabel = ({toDo, children, onTitleChange}) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <label htmlFor="toDoTitle" className={styles.Label}>{children}</label>
            <input 
                id={toDo} 
                value={toDo}
                ref={inputRef}
                onChange={onTitleChange}
                className={styles.InputField}
            />
        </>
    )
}