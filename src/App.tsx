import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreatePost from "./pages/CreatePost";
import PostData from "./pages/PostData";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InitialPage from "./pages/InitialPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/postData/:id" element={<PostData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
