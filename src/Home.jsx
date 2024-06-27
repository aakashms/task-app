import { useState, useEffect } from "react";
import "./css/App.css";
import Task from "./task";
import { Link, Route, Routes } from "react-router-dom";
import { FaPlus } from "react-icons/fa";


function Home() {
  const [list, setlist] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://task-server-qwgr.onrender.com/tasklist");
        const data = await response.json();
        setlist(data);
      } catch (err) {
        console.error("Error in fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  console.log(list);

  if(!list || list.length==0){
    return(
      <>
      <div className="heading">List of Tasks</div>
      <Link to="/newTask">
        <button className="newTaskBtn"> <FaPlus/> </button>
      </Link>
      <div className="container" > 
        <h2 className="empty-task" > Create task from the below button </h2>       
        
        
      </div>
    </>
    )

  }


  return (
    <>
      <div className="heading">List of Tasks</div>
      <Link to="/newTask">
        <button className="newTaskBtn"> <FaPlus/> </button>
      </Link>
      <div className="container" >        
        {list.map((t) => (
          <Link to={`/exist/${t._id}`}>  
            <Task title={t.title} due={t.due} key={t._id} />
          </Link>
        ))}
        
      </div>
    </>
  );
}

export default Home;
