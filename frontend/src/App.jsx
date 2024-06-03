import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Security from "./pages/Security.jsx";
import NewsPage from "./pages/News2.jsx";
import Securities from "./pages/Securities.jsx";
import Auth from "./pages/Auth.jsx";
import Registration from "./pages/Registration.jsx";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserProfile from "./pages/UserProfile.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import About from "./pages/About.jsx";

function App() {
  const [user, setUser] = useState();

  const getUser = () => {
    const loggedInUser = localStorage.getItem("user");
    //   console.log(loggedInUser);
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      try {
        axios.get("http://localhost/get_user_info_by_token").then((r) => {
          const userStr = JSON.stringify(r.data);
          localStorage.setItem("user", userStr);
          setUser(r.data);
        });
      } catch (error) {
        setUser(null);
      }
    }
    setUser(null);
    return null;
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header user={user} setter={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/security/:secId" element={<Security />} />
        <Route path="/securities" element={<Securities />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Auth setter={setUser} />} />
        <Route
          path="/registration"
          element={<Registration setter={setUser} />}
        />
        <Route path="/user" element={<UserProfile user={user} />} />
      </Routes>
    </>
  );
}

export default App;
