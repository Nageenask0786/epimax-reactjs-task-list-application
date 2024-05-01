import { FaEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";

import "./index.css";

const TaskItem = (props) => {
  const { taskDetails , onClickOfDelete ,updateStatus} = props;
  const { id, title, dueDate, status ,description } = taskDetails;
  const deleteTodo = () => {
    onClickOfDelete(id)
  }

  const onClickOfEdit = () => {

  const statusOptions = ["To Do", "In Progress", "Completed"];
    const currentIndex = statusOptions.findIndex((option) => option === status);
    const nextIndex = (currentIndex + 1);
    const index = nextIndex >=statusOptions.length ? 0 : nextIndex
    const nextStatus = statusOptions[index];
    updateStatus(id, nextStatus);
  }
  
  const getStatusBgColor = () => {
    switch(status) {
        case "To Do" :
        return "#FFCCCC"
        case "In Progress" :
        return "#fbfb82"
        case 'Completed' :
        return "#66fa66"
        default :
        return null
    }
  }

  const bgColor = getStatusBgColor()
  return (
    <li className="task-item">
    <div className="title-container">
      <p className="title">{title}</p>
      </div>
      <div className="description-container">
        <p className="description-text">{description}</p>
      </div>
      <div className="status-container">
      <button className="status-btn" style={{backgroundColor : bgColor}} type="button">{status}        
       <FaEdit style={{marginLeft : "10px"}} onClick={onClickOfEdit}/>
</button>
      </div>
      <div className="date-container">
      <p className="due-date">{dueDate}</p>
      </div>
      <button type="button" className="btn" onClick={deleteTodo}>
        <MdDelete size={15} color = "#5f5f62" style={{marginLeft : "5px"}}/>
      </button>
    </li>
  );
};

export default TaskItem;
