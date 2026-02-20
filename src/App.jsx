import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./components/Login";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import ApplicationsPage from "./components/ApplicationsPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="pt-20">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<ApplicationsPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;