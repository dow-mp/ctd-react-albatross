import { ToDoList } from './components/ToDoList';
import { AddToDoForm } from './components/AddToDoForm';
import { useState, useEffect, useCallback } from 'react';
import Airtable from 'airtable';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './App.module.css';

const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}${process.env.REACT_APP_AIRTABLE_BASE_NAME}?view=Grid+view`

const base = new Airtable({apiKey: `${process.env.REACT_APP_AIRTABLE_API_KEY}`}).base(`${process.env.REACT_APP_AIRTABLE_BASE_ID}`);


function App() {

  // initial state for toDoList retrieved from local storage (or empty if no local storage exists) until results are received from the API
  const [ toDoList, setToDoList ] = useState(JSON.parse(localStorage.getItem("savedToDoList")) || []);
  const [ isLoading, setIsLoading ] = useState(true);

  // fetch data from Airtable using fetch API with useEffect for loading data on initial render and every update
  useEffect(() => {
    fetch(`${url}`, {
      method: 'GET', 
      headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
        }
      })
      .then((response) => response.json())
      .then((result) => {
        setToDoList(result.records);
        setIsLoading(false);
      })
      .catch(()=>{console.log('Error')})
  })

  // store toDoList to local storage on initial render and anytime toDoList changes
  useEffect(() => {
    if(!isLoading) {
    localStorage.setItem('savedToDoList', JSON.stringify(toDoList))}
  }, [toDoList]);
  
  // POST new to do list items to Airtable using the Fetch API
  async function addToDo(newToDo) {
    const toDoPostBody = {
      fields: {
        title: newToDo.title
      }};

    let response = await fetch(`${url}`, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/JSON',
          'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
        },
      body: JSON.stringify(toDoPostBody),
    });
    
    console.log(await response.json());

    setToDoList([...toDoList]);
    console.log(toDoList);
  };

  // delete to do list item using Airtable API
  const removeToDo = (id) => {
    const updatedToDoList = toDoList.filter(
      (todo) => todo.id !== id
      );
    console.log({updatedToDoList});
    
    const filterOutForDelete = toDoList.filter(
      (todo) => todo.id == id
    );

    const deleteThisItemId = filterOutForDelete[0].id;
      console.log(deleteThisItemId);
      base('Default').destroy([deleteThisItemId], 
        function(err, deletedRecords) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted', deletedRecords.length, 'records');
      });
    setToDoList(updatedToDoList);
  };

  const navigate = useNavigate(); 

  const navigateToMakeList = () => {
    navigate('/todolist');
  };

  return (
      <Routes>
        <Route
          path="/"
          element={<button type="button" className={styles.SpecialButton} onClick={navigateToMakeList}>Make Your To Do List</button>}
          exact
          >
        </Route>
        <Route 
          path={"/todolist"} 
          element={
            <div className={styles.Body}>
              <h1 className={styles.HeaderOne}>To Do List</h1>
             
             <AddToDoForm onAddToDo={addToDo} />
              
              {isLoading 
              ? <p>Loading...</p> 
              : <ToDoList 
                  list={toDoList} 
                  onRemoveToDo={removeToDo}/>}

            </div>}
          exact>
        </Route>
      </Routes>
  );
}

export default App;
