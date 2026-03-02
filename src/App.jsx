import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./components/Login";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import ApplicationsPage from "./components/ApplicationsPage";
import PreparationPage from "./components/PreparationPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="pt-20 min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/preparation" element={<PreparationPage/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;