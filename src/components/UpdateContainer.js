import { useState }from 'react';

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
        <form onSubmit={handleSubmit}>
            <input placeholder={todo.fields.title} onChange={handleChange}/>
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="submit">Save</button>
        </form>
    </>
  )
};