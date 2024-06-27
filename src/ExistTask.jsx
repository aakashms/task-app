import React, { useState, useEffect } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { VscCheck } from "react-icons/vsc";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExistTask() {
  const { id } = useParams();
  const [list, setlist] = useState(null);
  const [isEdit, setEdit] = useState(false);
  const navigate = useNavigate();
  let isDel = false;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:4000/tasklist/${id}`);
        const data = await response.json();
        setlist(data);
      } catch (err) {
        console.error("Error in fetching task:", err);
      }
    };

    fetchTask();
  }, [id]);

  if (!list) {
    return <div>Loading...</div>;
  }

  console.log(list);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setlist((prevTask) => ([{ ...prevTask, [id]: value }]));
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.put( `http://localhost:4000/task/${id}`, list[0]);
      console.log('resonse ::',response);
      if(response.status===200){
        !isDel? toast.info("Task Edited Successfully!"):""
        setTimeout( ()=>{
          navigate('/')
        },3000);
      }

    }catch(err){
      console.error("Error in updating the task");
    }

  }

  const handleDelete = async()=>{
    isDel = true;
    try{
      const response = await axios.delete( `http://localhost:4000/task/${id}`);
      console.log('resonse for delete:',response);
      if(response.status===200){
        toast.error("Task Deleted Successfully!")
        setTimeout( ()=>{
          navigate('/')
        },2000);
      }

    }catch(err){
      console.error("Error in deleting the task");
    }

  }



  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  return (
    <>
      <nav className="heading"> Task</nav>
      <form onSubmit={handleSubmit} >
        <div className="container">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={list[0].title}
            onChange={ handleChange}
            disabled={!isEdit}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            typeof="text"
            id="description"
            placeholder="description"
            value={list[0].description}
            onChange={handleChange}
            disabled={!isEdit}
          />
          <label htmlFor="due" className="due">
            Due date:
          </label>
          <input
            type="date"
            id="due"
            value={list[0].due}
            onChange={ handleChange}
            disabled={!isEdit}
          />

          <div className="btn-container">
            {!isEdit ? (
              <button className="ok" onClick={handleEdit}>
                {" "}
                <MdOutlineModeEdit />
              </button>
            ) : (
              <button type="submit" className="ok" onClick={handleSubmit}>
                {" "}
                <VscCheck />{" "}
              </button>
            )}
            <button className="close" onClick={handleDelete}>
              {" "}
              <AiTwotoneDelete />
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default ExistTask;
