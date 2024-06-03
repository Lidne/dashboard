import React, { useEffect, useState } from "react";
import { DatePicker, Spin } from "antd";
import axios from "axios";
const { RangePicker } = DatePicker;

const News2 = () => {
  const parseDate = (date) => {
    // говнокодик)
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();

    return y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  };
  const today = new Date();

  const daysToSubtract = 10;
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - daysToSubtract);

  const [tillDateStr, setTillDateStr] = useState(parseDate(today));
  const [fromDateStr, setFromDateStr] = useState(parseDate(pastDate));
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost/news?from_=${fromDateStr},to_=${tillDateStr}`)
      .then((r) => {
        setNews(r.data.NEWS);
        console.log(r.data.NEWS);
      });
  }, [fromDateStr, tillDateStr]);

  useEffect(() => {
    axios
      .get(`http://localhost/news?from_=${fromDateStr},to_=${tillDateStr}`)
      .then((r) => {
        setNews(r.data.NEWS);
        console.log(r.data.NEWS);
      });
  }, []);

  const onDateChange = (date, dateString) => {
    setFromDateStr(dateString[0]);
    setTillDateStr(dateString[1]);
  };

  // Функция для создания элемента блога
  const createBlogElement = (title, date, link, index) => (
    <div
      className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl m-4"
      key={index}
    >
      {/* <div className="flex items-center">
        <img
          src={blog.imageUrl}
          alt="blogs tailwind section"
          className="rounded-t-2xl w-full"
        />
      </div> */}
      <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
        <span className="text-indigo-600 font-medium mb-3 block">
          {tillDateStr}
        </span>
        <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">
          {title}
        </h4>
        <a
          href={link}
          className="cursor-pointer text-lg text-indigo-600 font-semibold"
        >
          Read more..
        </a>
      </div>
    </div>
  );

  return (
    <div>
      {/* Поисковая строка */}
      <div className="flex flex-col items-center">
        <RangePicker onChange={onDateChange} format={"YYYY-MM-DD"} />
      </div>

      <div
        id="blogContainer"
        className="flex flex-wrap justify-center space-x-4 p-4"
      >
        {news != null
          ? news.map((blog, index) =>
              createBlogElement(blog.title, blog.date, blog.link, index)
            )
          : <Spin/>}
      </div>
    </div>
  );
};

export default News2;
