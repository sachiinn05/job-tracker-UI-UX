import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthFrom from "./components/Login";
import Profile from "./components/Profile";


function App() {
  return (
   
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<AuthFrom/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;