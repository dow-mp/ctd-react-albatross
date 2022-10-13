import { ToDoList } from './components/ToDoList';
import { AddToDoForm } from './components/AddToDoForm';
import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, /*useNavigate*/ } from 'react-router-dom';
import styles from './App.module.css';

const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}${process.env.REACT_APP_AIRTABLE_BASE_NAME}?view=Grid+view`

const changeUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}${process.env.REACT_APP_AIRTABLE_BASE_NAME}/`;


function App() {

  const [ toDoList, setToDoList ] = useState([]);
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
  }, []);

  useEffect(() => {
    console.log(`fetching via side effect`)
    getData()
  }, [getData]);

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
      fetch(`${changeUrl}${deleteThisItemId}`, {
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

  // const renderUpdateContainer = () => {

  // }
  const updateToDo = (updatedToDo) => {
    console.log(updatedToDo);
    // const updatedToDoList = () => {
    //   console.log('update to do item');
    // i dont want to filter anything out, but I do need to account for one particular title that has been changed
    // identify which title is changing
    // capture its new value
    // locate that item in the toDoList array and splice it/replace it with the new value
    // };

    // const filteredForUpdate = toDoList.filter(
    //   (todo) => todo.id === updatedToDo.id
    // );

    // const updateThisItemId = filteredForUpdate[0].id;
    fetch(`${changeUrl}${updatedToDo.id}`, {
      method: 'PATCH', 
      headers: {
          'Content-Type': 'application/JSON',
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
        },
      body: JSON.stringify({
        fields: {
          title: updatedToDo.title
        }}),
          })
      .then(setTimeout(() => {
          getData()
        }, 100))
      .catch(()=>{console.log('Error')})
  };

  // {
  //   "id": "recwA7ZB0LxXZyTlK",
  //   "fields": {
  //     "title": "item 1"
  //   }
  // },

  // allows navigation from / landing page via button using onClick
  // const navigate = useNavigate(); 
  // const navigateToMakeList = () => {
  //   navigate('/todolist');
  // };

  return (
      <Routes>
        {/* commenting out to remove landing page requirement from project, landing page is unnecessary for the functionality of the app
        <Route
          path="/"
          element={<button type="button" className={styles.SpecialButton} onClick={navigateToMakeList}><span className={styles.SpecialButtonSpan}>Make Your To Do List</span></button>}
          exact
          >
        </Route> */}
        <Route 
          // path={"/todolist"} 
          path="/"
          element={
            <div className={styles.Body}>
              <h1 className={styles.HeaderOne}>To Do List</h1>
             
             <AddToDoForm onAddToDo={addToDo} />
              
              {isLoading 
              ? <p>Loading...</p> 
              : <ToDoList 
                  list={toDoList} 
                  onRemoveToDo={removeToDo}
                  onUpdateToDo={updateToDo}
                  />}

            </div>}
          exact>
        </Route>
      </Routes>
  );
}

export default App;
