import React, { useState, useEffect } from "react";
import MarqueeStock from "./MarqueeStock";
import Marquee from "react-fast-marquee";
import axios from "axios";

const Tops = () => {
  const [tops, setTops] = useState([]);

  const fetchTops = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    // console.log(
    //   tops
    //     .filter((item) => (item[11] - item[6]) > 0)
    //     .map((item) => [item[3], item[11], item[6]])
    // );
    axios
      .get(
        "https://iss.moex.com/iss/history/engines/stock/markets/shares/securities.json?date=" +
          date.toISOString().split("T")[0]
      )
      .then((r) => {
        // console.log(r.data.history.data);
        setTops(r.data.history.data);
        // setTops(r.data.history.data.filter((item) => (item[11] - item[6]) > 0));
      });
    // console.log(1);
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
