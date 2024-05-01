import { Switch, Route } from "react-router-dom";

import PieChartComponent from "./components/PieChart";
import TaskList from "./components/TaskList";

const App = () => (
  <Switch>
    <Route exact path="/" component={TaskList} />
    <Route exact path="/pie-chart" component={PieChartComponent} />
  </Switch>
);

export default App;
