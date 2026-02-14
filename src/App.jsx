import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthFrom from "./components/Login";


function App() {
  return (
   
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<AuthFrom/>}/>
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;