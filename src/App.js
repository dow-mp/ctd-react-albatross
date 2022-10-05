import { ToDoList } from './components/ToDoList';
import { AddToDoForm } from './components/AddToDoForm';
import { useState, useEffect, useCallback } from 'react';
import Airtable from 'airtable';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';

const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}${process.env.REACT_APP_AIRTABLE_BASE_NAME}?view=Grid+view`

const base = new Airtable({apiKey: `${process.env.REACT_APP_AIRTABLE_API_KEY}`}).base(`${process.env.REACT_APP_AIRTABLE_BASE_ID}`);


function App() {

  const [ toDoList, setToDoList ] = useState(JSON.parse(localStorage.getItem("savedToDoList")) || []);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    fetch(`${url}`, {headers: {Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`}})
      .then((response) => response.json())
      .then((result) => {
        console.log('result: ' + JSON.stringify(result));
        console.log('result title: ' + result.records[0].fields.Title);
        setToDoList(result.records);
        console.log(toDoList);
        setIsLoading(false);
      })
      .catch(()=>{console.log('Error')})
  }, [])

  useEffect(() => {
    if(!isLoading) {
    localStorage.setItem('savedToDoList', JSON.stringify(toDoList))}
  }, [toDoList]);

  // created a function that takes in the newToDo from the Form and creates an item in the airtable
  // next - figure out re-fetching the airtable data to display the new item
  const addToDo = useCallback((newToDo) => {
    console.log({newToDo})
    // console.log('before: ' + JSON.stringify(toDoList));
    // console.log('after: ' + JSON.stringify(toDoList));
    base(`Default`).create([{
        "fields": {"title": newToDo.title}}
    ], function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.getId());
    })

    setToDoList([...toDoList, newToDo]);
  }, [toDoList]);

  // re-fetch the data each time a new to do item is added to the table...fix this
  // useEffect(() => {
  //   addToDo()
  // }, [toDoList]);

  const removeToDo = (id) => {
    // create a new to do list including only those to do items whose keys do NOT equal the id passed in as a parameter
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

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path={"/"} 
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
        <Route
          path="/new"
          element={<h1>New To Do List</h1>}
          exact
          >
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
