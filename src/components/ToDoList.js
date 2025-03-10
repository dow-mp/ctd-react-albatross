import { ToDoListItem } from './ToDoListItem';
import styles from './ToDoList.module.css';
import PropTypes from 'prop-types';

export const ToDoList = ({list, onRemoveToDo, onUpdateToDo, renderUpdateContainer}) => {
    return (
    <ul className={styles.UnorderedList}>
        {list.map((item) => {
            return (
                <ToDoListItem
                    key={item.id}
                    todo={item}
                    onRemoveToDo={onRemoveToDo}
                    onUpdateToDo={onUpdateToDo}
                    renderUpdateContainer={renderUpdateContainer}
                />
            )
        })}
    </ul>
    )
};

ToDoList.propTypes = {
    list: PropTypes.array,
    onRemoveToDo: PropTypes.func,
}