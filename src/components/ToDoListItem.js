import { useState } from 'react';
import styles from './ToDoListItem.module.css';
import PropTypes from 'prop-types';
import { UpdateContainer } from './UpdateContainer';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiTwotoneEdit } from 'react-icons/ai';
import { IoTrash } from "react-icons/io5";

export const ToDoListItem = ({onRemoveToDo, todo, onUpdateToDo}) => {

const [ clickState, setClickState ] = useState(false);

const falseClickState = () => {
    setClickState(false);
}

    return (
        <div>
            <li className={styles.ListItem}>
                <span className={styles.ListItemTitle}>{todo.fields.title}</span>
                <div className={styles.ButtonDiv}>
                    <button type="button" onClick={() => {setClickState(true)}} className={styles.RemoveItemButton}>
                        <AiOutlineEdit className={styles.Icons}/>
                    </button>
                    {clickState && <UpdateContainer todo={todo} updateToDo={onUpdateToDo} onCancel={falseClickState}/>}
                    <button type="button" onClick={() => onRemoveToDo(todo.id)} className={styles.RemoveItemButton}>
                        <IoTrash className={styles.Icons}/>
                    </button>
                </div>
            </li>
        </div>
    )
};

ToDoListItem.propTypes = {
    onRemoveToDo: PropTypes.func,
    todo: PropTypes.object,
}