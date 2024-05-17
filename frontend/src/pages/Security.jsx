import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SecCard from "../components/SecCard";
import BuyCard from "../components/BuyCard";
import SecGraph from "../components/SecGraph";

const Security = () => {
  const { secId } = useParams();
  const [secData, setData] = useState({});

  const fetchSecData = () => {
    axios
      .get(
        `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${secId}.json`
      )
      .then((r) => {
        setData(r.data.securities.data.filter((row) => row[1] == "TQBR")[0]);
        // console.log(secData);
      });
  };

  useEffect(() => {
    fetchSecData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 gap-x-10">
        <SecCard secData={secData} />
        <BuyCard price={secData[3]}/>
        <SecGraph secId={secId}/>
      </div>
    </div>
  );
};

export default Security;
