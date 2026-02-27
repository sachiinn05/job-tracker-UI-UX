import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./components/Login";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import ApplicationsPage from "./components/ApplicationsPage";
import AddPreparation from "./components/Preparation";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Global spacing for fixed navbar */}
      <main className="pt-20 min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/preparation" element={<AddPreparation/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;