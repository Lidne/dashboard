import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Security = () => {
  const { secId } = useParams();
  const [secData, setData] = useState({});

  const fetchSecData = () => {
    axios
      .get(
        `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${secId}.json`
      )
      .then((r) => {
        console.log(r.data.securities.data[1]);
        setData(r.data.securities.data[1]);
      });
  };

  useEffect(() => {
    fetchSecData();
  }, []);

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-col">
        <div className="flex flex-row rounded-lg bg-slate-300">
          <div className="flex flex-col">
            <div className="m-10">
              <div>{secData[9]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
