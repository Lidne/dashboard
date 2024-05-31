import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "../utils/axios";

const Securities = () => {
  const [securities, setSec] = useState([]);

  const fetchSecurities = () => {
    axios
      .get(
        "https://iss.moex.com/iss/engines/stock/markets/shares/securities.json"
      )
      .then((r) => {
        setSec(r.data.securities.data);
      });
  };

  useEffect(() => {
    fetchSecurities();
  }, []);

  return (
    <div className="flex flex-col ml-12 space-y-5 divide-x-0 divide-y-2 divide-solid">
      <div className="flex flex-row py-2 items-center space-x-4 border-6 border-black">
        <div>Тикер</div>
        <div>Название</div>
        <div>Цена</div>
      </div>
      {securities.map((sec) => (
        <NavLink
          to={`/security/${sec[0]}`}
          key={1}
          className="flex flex-row py-2 items-center space-x-4 border-6 border-black"
        >
          <div>{sec[0]}</div>
          <div>{sec[2]}</div>
          <div>{sec[15]}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default Securities;
