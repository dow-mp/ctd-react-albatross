import React from 'react';
import styles from './ToDoListItem.module.css';
import PropTypes from 'prop-types';

export const ToDoListItem = ({onRemoveToDo, todo}) => {
    // console.log(todo.fields.Title);
    return (
        <div>
            <li className={styles.ListItem}>
                <span className={styles.ListItemTitle}>{todo.fields.Title}</span>
                {/* remove button below not functional when attempting to remove items by key (i.e. the id of the to do list item) instead this method would result in entire to do list removal; switching to removing by matching title resolves the issue and to do list items can be individually removed when using the title only */}
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