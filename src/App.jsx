import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthFrom from "./components/Login";
import Profile from "./components/Profile";
import EditProfile from "./components/EditiProfile";


function App() {
  return (
   
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<AuthFrom/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;