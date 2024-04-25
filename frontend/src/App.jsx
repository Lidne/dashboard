import { useState } from "react";
import Header from "./components/Header.jsx";
import News from "./components/News.jsx";
import Deals from "./components/Deals.jsx";
import Tops from "./components/Tops.jsx";

function App() {
  
  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-gray-100 pt-6">
        <div className="">
          <Tops />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row space-x-12 mt-12 items-center">
            <Deals />
            <News />
          </div>
          <div className="flex flex-col space-y-5">
            <div className="flex flex-row space-x-10">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
