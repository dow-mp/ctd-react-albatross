import { useState } from 'react';
import styles from './ToDoListItem.module.css';
import PropTypes from 'prop-types';
import { UpdateContainer } from './UpdateContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const ToDoListItem = ({onRemoveToDo, todo, onUpdateToDo}) => {

const [ clickState, setClickState ] = useState(false);

const falseClickState = () => {
    setClickState(false);
}

    return (
        <div>
            <li className={styles.ListItem}>
                <span className={styles.ListItemTitle}>{todo.fields.title}</span>
                <button type="button" onClick={() => {setClickState(true)}} className={styles.RemoveItemButton}>
                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" className={styles.Icons}/>
                </button>
                {clickState && <UpdateContainer todo={todo} updateToDo={onUpdateToDo} onCancel={falseClickState}/>}
                <button type="button" onClick={() => onRemoveToDo(todo.id)} className={styles.RemoveItemButton}>
                    <FontAwesomeIcon icon="fa-solid fa-trash" className={styles.Icons}/>
                </button>
            </li>
        </div>
    )
};

ToDoListItem.propTypes = {
    onRemoveToDo: PropTypes.func,
    todo: PropTypes.object,
}