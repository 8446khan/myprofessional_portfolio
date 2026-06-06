import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Skills from "./component/Skills";
import Projects from "./component/Projects";
import Contact from "./component/Contact";
import Education from "./component/Education";
import About from "./component/About";
import Certificates from "./component/Certificates";
import Footer from "./component/Footer";

import AdminLayout from "./adminComponent/AdminLayout";

import Projects2 from "./adminComponent/Projects";
import Certificates2 from "./adminComponent/Certificates";
import Qualification from "./adminComponent/Qualification";
import Skills2 from "./adminComponent/Skills";
import UserInfo from "./adminComponent/UserInfo";
import AdminLoginPage from "./component/AdminloginPage";
import ChangeAdminCredentials from "./component/ChangeAdminCredentials";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* 🌐 Portfolio */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Education />
              <Skills />
              <Projects />
              <Certificates />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* 🧑‍💻 Admin */}
        <Route path="/admin" element={<AdminLayout />}>

          {/* Default Page */}
          <Route index element={<Projects2 />} />

          <Route path="projects" element={<Projects2 />} />
          <Route path="certificates" element={<Certificates2 />} />
          <Route path="skills" element={<Skills2 />} />
          <Route path="qualification" element={<Qualification />} />
          <Route path="users" element={<UserInfo />} />
          <Route path="AdminLoginPage" element={<AdminLoginPage />} />
          <Route path="ChangeAdminCredentials" element={<ChangeAdminCredentials />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;