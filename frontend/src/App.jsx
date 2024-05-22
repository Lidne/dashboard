import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Security from "./pages/Security.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import Securities from "./pages/Securities.jsx";
import Auth from "./pages/Auth.jsx";
import Registration from "./pages/Registration.jsx";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/security/:secId" element={<Security />} />
        <Route path="/securities" element={<Securities />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
