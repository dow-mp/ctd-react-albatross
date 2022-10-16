import { useState }from 'react';
import styles from './UpdateContainer.module.css';

export const UpdateContainer =({todo, updateToDo, onCancel}) => {

const [ updatedTitle, setUpdatedTitle ] = useState('');

const handleChange = (e) => {
    console.log(`from UpdateContainer: ${e.target.value}`);
    let updatedToDoTitle = e.target.value;
    console.log({updatedToDoTitle});
    setUpdatedTitle(updatedToDoTitle);
    // e.target.value='';
}

const handleSubmit = (e) => {
    e.preventDefault();
    updateToDo({id: todo.id, title: updatedTitle})
    console.log(updatedTitle);
    setUpdatedTitle('');
    onCancel();

}

  return (
    <>
        <form onSubmit={handleSubmit} className={styles.UpdateForm}>
            <input placeholder={todo.fields.title} onChange={handleChange} className={styles.InputField}/>
            <div className={styles.TwoButtonDiv}>
              <button type="submit" className={`${styles.RemoveItemButton} ${styles.SaveButtonText}`}>Save</button>
              <button type="button" onClick={onCancel} className={`${styles.RemoveItemButton} ${styles.CancelButtonText}`}>Cancel</button>
            </div>
        </form>
    </>
  )
};