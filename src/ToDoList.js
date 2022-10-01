import { ToDoListItem } from './ToDoListItem';
import styles from './ToDoList.module.css';

// the stateful toDoList array of objects is then passed in here as props (destructured) which has allowed the sharing of state between ToDoList and AddToDoForm via storing state for the entire list in App and using a callback handler to update the state from AddToDoForm
export const ToDoList = ({list, onRemoveToDo}) => {
    return (
    <ul className={styles.UnorderedList}>
        {list.map((item) => {
            return (
                <ToDoListItem
                    key={item.id}
                    todo={item}
                    onRemoveToDo={onRemoveToDo}
                />
            )
        })}
    </ul>
    )
};