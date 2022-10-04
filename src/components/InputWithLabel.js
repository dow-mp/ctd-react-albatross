import { useState, useEffect, useRef } from 'react';
import styles from './ToDoForm.module.css';
import PropTypes from 'prop-types';

export const InputWithLabel = ({toDo, children, onTitleChange}) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <label htmlFor={toDo} className={styles.Label}>{children}</label>
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

InputWithLabel.propTypes = {
    toDo: PropTypes.string, 
    children: PropTypes.string,
    onTitleChange: PropTypes.func,
}