import { useState } from 'react';
import styles from './ToDoListItem.module.css';
import PropTypes from 'prop-types';
import { UpdateContainer } from './UpdateContainer';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoTrash } from "react-icons/io5";

export const ToDoListItem = ({onRemoveToDo, todo, onUpdateToDo}) => {

const [ clickState, setClickState ] = useState(false);

const falseClickState = () => {
    setClickState(false);
}

const shortenedToDo = todo.fields.title.slice(0, -(todo.fields.title.length-8)) + '...';
// next - figure out how to allow users to expand these dots to view the entire to do list title
// is there a way to only utilize this feature on mobile?


    return (
        <div>
            <li className={styles.ListItem}>
                <div className={styles.ListItemContainer}>
                    <span className={styles.ListItemTitle}>{todo.fields.title.length < 10 ? todo.fields.title : shortenedToDo}</span>
                    {!clickState && <div className={styles.TwoButtonDiv}>
                        <button type="button" onClick={() => {setClickState(true)}} className={styles.UpdateItemButton}>
                            <AiOutlineEdit className={styles.Icons}/>
                        </button>
                        <button type="button" onClick={() => onRemoveToDo(todo.id)} className={styles.RemoveItemButton}>
                            <IoTrash className={styles.Icons}/>
                        </button>
                    </div>}
                </div>
                {clickState && <UpdateContainer todo={todo} updateToDo={onUpdateToDo} onCancel={falseClickState}/>}
            </li>
        </div>
    )
};

ToDoListItem.propTypes = {
    onRemoveToDo: PropTypes.func,
    todo: PropTypes.object,
}