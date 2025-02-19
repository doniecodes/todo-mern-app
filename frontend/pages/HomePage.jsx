import React, { useEffect, useState } from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa';
import { redirect } from 'react-router-dom';
import Header from '../components/Header';
import { UseTodosContext } from "../context/UseTodosContext"
import { UseUserContext } from "../context/UseUserContext"
import { clsx } from "clsx";


const HomePage = () => {
  let [newItem, setNewItem] = useState('');
  const [ error, setError ] = useState(null); 
  const [ updateId, setUpdateId ] = useState("")

  const { user, mode } = UseUserContext();

  const { todos, dispatch } = UseTodosContext();

  const token = user && user.token;


// items to fetch
useEffect(()=> {
  const getTodos = async ()=> {
    const res = await fetch(`${import.meta.env.VITE_DB_URI}/todos`, {
      headers: {"Authorization": `Bearer ${token}`}
    })
    const data = await res.json()

    if(res.ok){
      dispatch({ type: "GET_TODOS", payload: data })
    }
    if(!res.ok){
      setError(data.error)
    }
  }

  if(user){
    getTodos();
  }
}, [dispatch, newItem, user])

// render new items
let renderNewItem = async (e)=>{
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const title = formData.get("todo");
 
  if(!title){
    return;
  }

    const res = await fetch(`${import.meta.env.VITE_DB_URI}/todos/`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    })
    const json = res.json();
    if(!res.ok){
      setError(json.error)
    }
    if(res.ok){
      dispatch({ type: "ADD_TODO", payload: json })
    }
}

// delete items 
let deleteItem = async (id)=> {
    const res = await fetch(`${import.meta.env.VITE_DB_URI}/todos/${id}`,{
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}` }
    })
    const data = await res.json();
    if(!res.ok){
      setError(data.error);
    }

    if(res.ok){
      dispatch({ type: "DELETE_TODO", payload: data});
    }
}

// Update item
const updateItem = async (id)=> {
  todos.map((todo)=> {
    if(todo._id === id){
      setUpdateId("todo-text-update")
    }
    
  })

  const res = await fetch(`${import.meta.env.VITE_DB_URI}/${id}`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
  const json = await res.json();
  if(res.ok) {
    dispatch({ type: "UPDATE_TODO", payload: json })
  }
  if(!res.ok){
    setError(json.error);
  }
}

const handleFilter = async (text)=> {
  if(text === "Completed"){
  }
}

//toggle completed
let toggleCompleted = (id, completed)=>{
  console.log(completed)
}


  return (
    <>
  <Header renderNewItem={renderNewItem}
  newItem={newItem}
  setNewItem={setNewItem} />

    { error && <div>{error.error}</div> }

      <div className={`container2 ${mode}`}>
      <section className={`todos-section ${mode}`}>
        
        { !todos && <div className='empty-list'>No todos here... </div> }

      <div className={`todos-wrapper ${mode}`}>
      <ul className={`todos-list ${mode}`}>
      { todos ? todos.map((todo)=> {
        const todo_class = todo.completed === false ? "todo-text" : "todo-completed"
        let update = "";

        const updateClass = update !== "" ? 'update-btn' : "hidden";

        return (
          <li key={todo.id} className='todo-item'>
          <label htmlFor="todo" className="todo-label">
          
          <input onChange={(e)=> toggleCompleted(todo.id, e.target.checked)} type="checkbox" id="todo" className='mr-5' defaultChecked={todo.completed}/>

          <textarea className={todo_class} value={todo.title} id={updateId}></textarea>

          <button className={updateClass}>done</button>
        </label>

        <div>
        <button onClick={()=> updateItem(todo._id)}><FaEdit className='edit-btn'/></button>
        <button onClick={()=> deleteItem(todo._id)}><FaTrash className='delete-btn'/></button>
        </div>
      </li>
        )
      }) : null }
      </ul>

      { todos && todos.length !== 0 &&
      <div id="todo-filters">
        <span onClick={(e)=> handleFilter(e.target.innerText)} className='filter'>All</span>
        <span onClick={(e)=> handleFilter(e.target.innerText)} className='filter'>Active</span>
        <span onClick={(e)=> handleFilter(e.target.innerText)} className='filter'>Completed</span>
        <div onClick={(e)=> handleFilter(e.target.innerText)} className="filter filter-all">Clear All</div>
      </div> }

      </div>
      </section>
      </div>
    </>
  )
}

export default HomePage
