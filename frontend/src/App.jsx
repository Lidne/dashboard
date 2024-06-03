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
import axios from "./utils/axios";
import About from "./pages/About.jsx";

function App() {
  const [user, setUser] = useState();
  const [balance, setBalance] = useState(0);

  const getUser = () => {
    try {
      axios.get("http://localhost/get_user_info_by_token").then((r) => {
        const userStr = JSON.stringify(r.data);
        localStorage.setItem("user", userStr);
        setUser(r.data);
        // console.log(r.data);
      });
    } catch (error) {
      setUser(null);
    }
  };

  const updateBalance = () => {
    try {
      axios.get("http://localhost/portfolio/balance").then((r) => {
        setBalance(r.data.balance);
      });
    } catch (error) {
      setBalance(0);
    }
  };

  useEffect(() => {
    getUser();
    updateBalance();
  }, []);

  return (
    <>
      <Header user={user} setter={setUser} balance={balance}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/security/:secId"
          element={<Security updateBalance={updateBalance}  />}
        />
        <Route path="/securities" element={<Securities />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Auth setter={setUser} />} />
        <Route
          path="/registration"
          element={<Registration setter={setUser} />}
        />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
