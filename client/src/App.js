import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateEmployee from "./components/Create";
import { Routes, Route } from "react-router-dom";
import Edit from "./components/Edit";
import Details from "./components/Details";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createEmployee" element={<CreateEmployee />} />
        <Route exact path="/editEmployee/:id" element={<Edit />} />
        <Route exact path="/viewEmployee/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
