import React from 'react';
import styles from './ToDoListItem.module.css';
import PropTypes from 'prop-types';

export const ToDoListItem = ({onRemoveToDo, todo}) => {
    return (
        <div>
            <li className={styles.ListItem}>
                <span className={styles.ListItemTitle}>{todo.fields.title}</span>
                <button type="button" onClick={() => onRemoveToDo(todo.id)} className={styles.RemoveItemButton}>
                    Remove
                </button>
            </li>
        </div>
    )
};

ToDoListItem.propTypes = {
    onRemoveToDo: PropTypes.func,
    todo: PropTypes.object,
}