import { Component } from "react";

import { RiCalendarTodoFill } from "react-icons/ri";

import { v4 } from "uuid";

import TaskItem from "../TaskItem";

import Header from "../Header";

import "./index.css";

class TaskList extends Component {
  state = {
    taskList: [],
    titleInput: "",
    descriptionText: "",
    dateInput: "",
    status: "To Do",
   errorMsg : ""

  };

  componentDidMount() {
    const storedTasks = localStorage.getItem("taskList");
    if (storedTasks) {
      this.setState({ taskList: JSON.parse(storedTasks) });
    }
  }


  onChangeTitle = (event) => {
    this.setState({ titleInput: event.target.value });
  };

  onChangeOfDescription = (event) => {
    this.setState({ descriptionText: event.target.value });
  };

  onChangeOfDate = (event) => {
    this.setState({ dateInput: event.target.value });
  };

  onChangeOfStatus = (event) => {
    this.setState({ status: event.target.value });
  };

  onClickOfDelete = (id) => {
    const {taskList} = this.state 
    const updatedTaskList = taskList.filter((each)=> each.id !== id )
    this.setState({taskList : updatedTaskList})
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));

  }

  addTaskItem = (event) => {
    event.preventDefault();
    const { dateInput, titleInput, status, descriptionText ,taskList } = this.state;
    const newTask = {
      id: v4(),
      title: titleInput,
      description: descriptionText,
      dueDate: dateInput,
      status,
    };
    if ((titleInput === "" && descriptionText === "" && dateInput === "" )|| (titleInput === "" || descriptionText === "" || dateInput === "")) {
        this.setState({errorMsg : "*Please Enter Valid Task Details"})
    }


    else if (titleInput === "") {
        this.setState({errorMsg : "*Enter Valid Title"})
    }

    else if (descriptionText === "") {
        this.setState({errorMsg : "*Enter Valid Task Description"})
    }

    else if (dateInput === "") {
        this.setState({errorMsg : "*Choose a Valid Date"})
    }
    else if (titleInput !== "" && descriptionText !== "" && dateInput !== "") {

    this.setState((prevState) => ({
      taskList:[...prevState.taskList , newTask],
      titleInput: "",
      descriptionText: "",
      dateInput: "",
      status: "To Do",
      errorMsg : ""
    }));
    localStorage.setItem("taskList",JSON.stringify([...taskList,newTask]))
}
  };

  updateStatus = (id,newStatus) => {
    const {taskList} = this.state 
    const updatedTaskList = taskList.map((eachTask)=> {
        if (eachTask.id === id){
            return {...eachTask,status : newStatus}
        }
        return eachTask
    })
    this.setState({taskList : updatedTaskList})
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));

  }

  render() {
    const { taskList, dateInput, titleInput, status, descriptionText, errorMsg} =
      this.state;

    return (
      <div className="task-list-application">
      <Header />
        <div className="task-list-heading-container">
          <h1 className="task-list-heading">Task List</h1>
          <RiCalendarTodoFill className="todo-list-icon" />
        </div>
        <form className="task-input-form-container" onSubmit={this.addTaskItem}>
        <div className="input-title-container">
        <label htmlFor="title" className="label-text">Title</label>
          <input
            type="text"
            className="title-input"
            placeholder="Enter task title"
            value={titleInput}
            onChange={this.onChangeTitle}
            id="title"
          />
          </div>
          <div className="input-description-container">
          <label htmlFor="description" className="label-text">Description</label>
          <textarea
            className="description"
            rows={8}
            placeholder="Enter task description"
            value={descriptionText}
            onChange={this.onChangeOfDescription}
            id="description"
          />

          </div>
         
          <div className="container">
          <div className="status-input-container">
          <label htmlFor="status" className="label-text">Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={this.onChangeOfStatus}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            </div>
            <div className="due-date-input-container">
            <label htmlFor="date" className="label-text">Due Date</label>
            <input
              type="date"
              className="date-input"
              value={dateInput}
              onChange={this.onChangeOfDate}
              id="date"
            />

            </div>
            <button type="submit" className="create-task-btn">
              Create Task
            </button>
          </div>
        </form>
        <p className="error-msg">{errorMsg} </p>
        <ul className="task-items-container">
        {taskList.map((each) => (
              <TaskItem key={each.id} taskDetails={each} onClickOfDelete = {this.onClickOfDelete} updateStatus = {this.updateStatus}/>
            ))}
        </ul>
      </div>
    );
  }
}

export default TaskList;
