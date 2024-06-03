import React, { useState, useEffect } from "react";
import MarqueeStock from "./MarqueeStock";
import Marquee from "react-fast-marquee";
import axios from "../utils/axios";

const Tops = () => {
  const [tops, setTops] = useState([]);

  const fetchTops = () => {
    const date = new Date();
    date.setDate(date.getDate() - 3);
    axios
      .get(
        "https://iss.moex.com/iss/history/engines/stock/markets/shares/securities.json?date=" +
          date.toISOString().split("T")[0]
      )
      .then((r) => {
        setTops(r.data.history.data);
        console.log(r.data.history.data);
      });
  };

  useEffect(() => {
    fetchTops();
  }, []);

  // console.log(tops)

  return (
    <Marquee pauseOnHover={true} speed={4} delay={0.5}>
      {tops.map((item) => (
        <MarqueeStock data={item} />
      ))}
    </Marquee>
  );
};

export default Tops;
