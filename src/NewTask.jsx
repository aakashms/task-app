import React, { useState } from "react";
import "./css/NewTask.css";
import { VscChromeClose } from "react-icons/vsc";
import { VscCheck } from "react-icons/vsc";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("");
  const navigate = useNavigate();
  const API_URL = 'http://localhost:4000'


  const handleSubmit = async(e)=>{
    await e.preventDefault();
    const task= {title,description,due};
    console.log(task);

    try{
      const response = await axios.post(`${API_URL}/newtask`, task);
      console.log(response.status);
      if(response.status==200){
        toast.success("Task added Successfully!")
        

        setTimeout( ()=>{
          navigate('/')
        },3000);

        
      }

    }catch(err){
      console.error(err);
    }


  }

   

  return (
    <>
      <nav className="heading"> New Task</nav>
      <ToastContainer />
      <form onSubmit={handleSubmit} >
      <div className="container">
        
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="due" className="due">
            Due date:
          </label>
          <input
            type="date"
            id="due"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />

          <div className="btn-container">
            <Link to="/">
              <button type="button" className="close">
                <VscChromeClose />
              </button>
            </Link>
            
            <button type="submit" className="ok" onClick={handleSubmit}>
              <VscCheck />              
            </button>
    
            
          </div>
        

      </div>
      </form>
        <ToastContainer />
    </>
  );
}

export default NewTask;
