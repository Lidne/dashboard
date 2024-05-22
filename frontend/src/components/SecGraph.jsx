import React, { useEffect, useState } from "react";
import { DatePicker, Select } from "antd";
const { RangePicker } = DatePicker;
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import axios from "axios";

const parseDate = (date) => {
  // говнокодик)
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  return y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
};

const SecGraph = ({ secId }) => {
  const [fromDate, setFromDate] = useState();
  const [tillDate, setTillDate] = useState();
  const today = new Date();

  const daysToSubtract = 100;
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - daysToSubtract);
  const [tillDateStr, setTillDateStr] = useState(parseDate(today));
  const [fromDateStr, setFromDateStr] = useState(parseDate(pastDate));
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("day");

  const options = [
    { value: "minute", label: "Минута" },
    { value: "hour", label: "Час" },
    { value: "day", label: "День" },
  ];

  const fetchData = (int) => {
    if (int === "day") {
      axios
        .get(
          `https://iss.moex.com/iss/history/engines/stock/markets/shares/securities/${secId}.json?from=${fromDateStr}&till=${tillDateStr}&lang=ru`
        )
        .then((r) => {
          setData(
            r.data.history.data.map((item) => ({ name: item[1], uv: item[11] }))
          );
        });
    } else if (int === "minute") {
      axios
        .get(
          `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${secId}/candles.json?iss.reverse=true&from=${fromDateStr}&till=${tillDateStr}&interval=1`
        )
        .then((r) => {
          setData(
            r.data.candles.data.map((item) => ({ name: item[7], uv: item[1] }))
          );
        });
    } else if (int === "hour") {
      axios
        .get(
          `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${secId}/candles.json?from=${fromDateStr}&till=${tillDateStr}&interval=60`
        )
        .then((r) => {
          setData(
            r.data.candles.data.map((item) => ({ name: item[7], uv: item[1] }))
          );
        });
    }
  };

  useEffect(() => {
    fetchData(interval);
  }, [fromDateStr, tillDateStr, interval]);

  useEffect(() => {
    fetchData(interval);
  }, []);

  const onDateChange = (date, dateString) => {
    console.log(date);
    setFromDate(date[0]);
    setTillDate(date[1]);
    setFromDateStr(dateString[0]);
    setTillDateStr(dateString[1]);
  };

  const selectChange = (value) => {
    setInterval(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-300 rounded-xl px-3 py-2">
          <p className="label">{label}</p>
          <p className="desc">{payload[0].value}₽</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row gap-x-8">
        <Select
          onChange={selectChange}
          options={options}
          defaultValue={"day"}
        />
        <RangePicker onChange={onDateChange} format={"YYYY-MM-DD"} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="uv" stroke="#8884d8" dot={<></>} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={CustomTooltip} />
          <Brush
            data={data.map((item) => item.name)}
            height={10}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecGraph;
