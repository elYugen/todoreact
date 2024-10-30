import React from "react";
import { useNavigate } from "react-router-dom";
import './Mytask.css'
import Loading from "../components/Loading/Loading";
import useUserTasks from "../hook/useUserTask";

function MyTask ({userId}) {
    const {tasks, loading, error} = useUserTasks(userId);
    const navigate =useNavigate();

    if (loading) return <Loading/>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div className="taskList">
          {tasks.map((task) => (
            <div 
              key={task._id} 
              className="myTaskBox" 
              onClick={() => navigate(`/task/${task._id}`)} // Redirige vers TaskDetail
            >
              <div className="myTaskBoxContent">
                <div className="myTaskBoxContentIcon" style={{ backgroundColor: "lightgrey" }}>
                  <span>🤹</span>
                </div>
                <div className="myTaskBoxContentTitle">
                  <p><b>{task.name}</b></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    export default Mytask;