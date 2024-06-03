import { Spin } from "antd";
import axios from "../utils/axios";
import { useEffect, useState } from "react";

const parseDate = (date) => {
  // говнокодик)
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  return (d <= 9 ? "0" + d : d) + "." + (m <= 9 ? "0" + m : m) + "." + y;
};

const News = () => {
  const [news, setNews] = useState([]);

  const fetchNews = () => {
    axios.get("http://127.0.0.1/news?from_=" + dateString).then((r) => {
      setNews(r.data.NEWS);
    });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const dateString = parseDate(new Date());

  return (
    <div className="flex flex-col space-y-4">
      <div>Последние новости</div>
      <div className="flex flex-col space-y-2 divide-x-0 divide-y-2 divide-solid">
        {news.length === 0 ? (
          <Spin />
        ) : (
          news.slice(0, 5).map((item) => (
            <div key={1}>
              <div>{dateString}</div>
              <div>{item.title}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;
