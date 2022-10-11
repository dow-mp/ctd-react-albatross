import { ToDoList } from './components/ToDoList';
import { AddToDoForm } from './components/AddToDoForm';
import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from './App.module.css';

const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}${process.env.REACT_APP_AIRTABLE_BASE_NAME}?view=Grid+view`

const deleteUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}${process.env.REACT_APP_AIRTABLE_BASE_NAME}/`;


function App() {

  // initial state for toDoList retrieved from local storage (or empty if no local storage exists) until results are received from the API
  const [ toDoList, setToDoList ] = useState(JSON.parse(localStorage.getItem("savedToDoList")) || []);
  const [ isLoading, setIsLoading ] = useState(true);

  // fetch data from Airtable using fetch API with useEffect for loading data on initial render and every update
  const getData = useCallback(() => {
    console.log('getData() runs')
    fetch(`${url}`, {
      method: 'GET', 
      headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
        }
      })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setToDoList(result.records);
        setIsLoading(false);
      })
      .catch(()=>{console.log('Error')})
  }, [])

  useEffect(() => {
    console.log(`fetching via side effect`)
    getData()
  }, [getData])

  // store toDoList to local storage on initial render and anytime toDoList changes
  useEffect(() => {
    if(!isLoading) {
    localStorage.setItem('savedToDoList', JSON.stringify(toDoList))}
  }, [toDoList]);

  // POST new to do list items to Airtable using the Fetch API
  const addToDo = (newToDo) => {
    if (newToDo.title.length > 0){
      fetch(`${url}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/JSON',
            'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
          },
        body: JSON.stringify({
          fields: {
            title: newToDo.title
          }}),
      })
      // re-fetch the data to render the updated toDoList on the page
      .then(setTimeout(() => {
        getData()
        }, 100))
      .catch(err => console.log('Error'))
    };
  };

  // delete to do list item using Airtable API
  const removeToDo = (id) => {
    const updatedToDoList = toDoList.filter(
      (todo) => todo.id !== id
      );
    
    const filterOutForDelete = toDoList.filter(
      (todo) => todo.id === id
    );

    const deleteThisItemId = filterOutForDelete[0].id;
      fetch(`${deleteUrl}${deleteThisItemId}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/JSON',
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
          },
        body: JSON.stringify( 
                [deleteThisItemId,]
              ),
            })
        .catch(()=>{console.log('Error')})
    setToDoList(updatedToDoList);
  };

  // allows navigation from / landing page via button using onClick
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
