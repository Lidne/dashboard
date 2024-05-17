import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const SecGraph = ({ secId }) => {
  const [fromDate, setFromDate] = useState();
  const [tillDate, setTillDate] = useState();
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get(
        `https://iss.moex.com/iss/history/engines/stock/markets/shares/securities/${secId}.json?from=${fromDate}&till=${tillDate}&lang=ru`
      )
      .then((r) => {
        // console.log(r.data.history.data);
        setData(r.data.history.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [fromDate, tillDate]);

  const onFromChange = (date, dateString) => {
    setFromDate(dateString);
  };

  const onTillChange = (date, dateString) => {
    setTillDate(dateString);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row gap-x-8">
        <DatePicker onChange={onFromChange} format={"YYYY-MM-DD"} />
        <DatePicker onChange={onTillChange} format={"YYYY-MM-DD"} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data.map((item) => ({ name: item[2], uv: item[11] }))}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecGraph;
