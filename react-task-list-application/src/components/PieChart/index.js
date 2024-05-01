import { PieChart, Pie, Legend, ResponsiveContainer ,Cell } from 'recharts';

import './index.css'
import Header from '../Header';

const PieChartComponent = () => {
    const storedData = localStorage.getItem("taskList");
    const data = JSON.parse(storedData) || [];
    console.log(data);

    const completedCount = data.filter((each) => each.status === "Completed").length;
    const inProgressCount = data.filter((each) => each.status === "In Progress").length;
    const todoCount = data.filter((each) => each.status === "To Do").length;

    const pieChartData = [
      { name: "Completed", value: completedCount, color : "#66fa66"},
      { name: "In Progress", value: inProgressCount ,color : "#fbfb82" },
      { name: "To Do", value: todoCount , color : "#FFCCCC"}
    ];

    return (
      <>
      <Header />
      <div className='pie-chart-container'>
     
      <h1 className='heading'>Pie Chart</h1>
      <ResponsiveContainer width="50%" height='50%' className= "chart-container">
      <PieChart>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
         
        >
        <Cell name="Completed" fill="#66fa66" />
          <Cell name="In Progress" fill="#fbfb82" />
          <Cell name="To Do" fill="#FFCCCC" />
        </Pie>
      
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    </div>
    </>
       );
  }


export default PieChartComponent;
