import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./Pages/Dashboard"
import Todo from "./pages/Todo"

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todo />} />
       {/* <Route path="/property" element={<Property />} /> */}
        

      </Routes>
    </Router>

  );
}

export default App;