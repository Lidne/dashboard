import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "../utils/axios";

const stocks = [
  {
    ticker: "YNDX",
    name: "Yandex",
    price: "43$",
  },
  {
    ticker: "LKL",
    name: "Lukoil",
    price: "$89",
  },
  {
    ticker: "FCB",
    name: "Facebook",
    price: "43$",
  },
  {
    ticker: "GZP",
    name: "Gazprom",
    price: "423$",
  },
];
const Securities = () => {
  const [securities, setSec] = useState([]);

  const fetchSecurities = () => {
    axios
      .get(
        "https://iss.moex.com/iss/engines/stock/markets/shares/securities.json?iss.meta=off&securities.columns=SECID,BOARDID,SHORTNAME,PREVPRICE"
      )
      .then((r) => {
        setSec(r.data.securities.data);
        console.log(r.data.securities.data);
      });
  };

  useEffect(() => {
    fetchSecurities();
  }, []);

  return (
    <div>
      <p className="text-lg font-medium text-gray-600  mb-2">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Акции&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Цена
      </p>
      <ul role="list" className="divide-y divide-gray-100">
        {securities.map((stock) => {
          if (stock[1] === "TQBR")
            return (
              <a href={`/security/${stock[0]}`}>
                <li
                  key={stock.name}
                  className="flex justify-between gap-x-4 py-5"
                >
                  <div className="flex min-w-0 gap-x-4 items-center">
                    <svg
                      className="h-6 w-6 text-yellow-400 cursor-pointer"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {stock[0]}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {stock[2]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center ml-auto w-20">
                    <p className="text-sm leading-6 text-gray-900">
                      {stock[3]} ₽
                    </p>
                  </div>
                </li>
              </a>
            );
        })}
      </ul>
    </div>
  );
};

export default Securities;
