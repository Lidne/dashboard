import axios from "../utils/axios";
import React, { useEffect, useState } from "react";

const Dividends = ({ secId }) => {
  const [divs, setDivs] = useState([]);

  const fetchDivs = () => {
    axios
      .get(
        `https://iss.moex.com/iss/securities/${secId}/dividends.json?iss.meta=off`
      )
      .then((r) => {
        // console.log(r.data);
        setDivs(r.data.dividends.data);
      });
  };

  useEffect(() => {
    fetchDivs();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 mb-10">
      {divs.length != 0 &&
        divs.map((item) => (
          <div className="flex flex-row justify-between items-center bg-slate-300 rounded-xl p-4">
            {item.map((i) => (
              <div>{i}</div>
            ))}
          </div>
        ))}
      {divs.length === 0 && (
        <div className="flex flex-col items-center bg-slate-300 rounded-xl p-4">
          <strong>Дивиденды пока не выплачивались</strong>
        </div>
      )}
    </div>
  );
};

export default Dividends;
