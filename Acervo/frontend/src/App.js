import "./App.css";
import {
  Login,
  Register,
  HomeScreen,
  Books,
  MyBooks,
  UpdateUser,
} from "./Screens/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<HomeScreen />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/MyBooks" element={<MyBooks />} />
        <Route path="/UpdateUser" element={<UpdateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
