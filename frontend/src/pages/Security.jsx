import axios from "../utils/axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SecCard from "../components/SecCard";
import BuyCard from "../components/BuyCard";
import SecGraph from "../components/SecGraph";
import Dividends from "../components/Dividends";

const Security = ({ updateBalance }) => {
  const { secId } = useParams();
  const [secData, setData] = useState({});
  const [currentPrice, setcurPrice] = useState(0);

  const fetchSecData = () => {
    axios
      .get(
        `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${secId}.json`
      )
      .then((r) => {
        setData(r.data.securities.data.filter((row) => row[1] == "TQBR")[0]);
      });
  };

  useEffect(() => {
    fetchSecData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 gap-10 size-1/2">
        <SecCard secData={secData} />
        <BuyCard price={secData[3]} secId={secId} updateBalance={updateBalance} />
        <div className="col-span-2">
          <SecGraph secId={secId} />
        </div>
        <h1>
          <strong>Выплаченные дивиденды</strong>
        </h1>
        <div className="col-span-2">
          <Dividends secId={secId} />
        </div>
      </div>
    </div>
  );
};

export default Security;
