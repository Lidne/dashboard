import React, { useEffect } from 'react';


const News2 = () => {
  // Массив объектов блога
  const blogs = [
    {
      date: "Jan 01, 2023",
      title: "Clever ways to invest in product to organize your portfolio",
      description: "Discover smart investment strategies to streamline and organize your portfolio.",
      imageUrl: "https://pagedone.io/asset/uploads/1696244317.png"
    },
    {
      date: "Feb 01, 2023",
      title: "How to grow your profit through systematic investment with us",
      description: "Unlock the power of systematic investment with us and watch your profits soar.",
      imageUrl: "https://pagedone.io/asset/uploads/1696244340.png"
    },
    {
      date: "Mar 01, 2023",
      title: "How to analyze every holdings of your portfolio",
      description: "Our comprehensive guide will equip you with the tools and insights needed to.",
      imageUrl: "https://pagedone.io/asset/uploads/1696244356.png"
    }
  ];

  useEffect(() => {
    // Здесь можно добавить код для инициализации меню, если это необходимо
  }, []);

  // Функция для создания кнопки
  const createButton = (id) => (
    <div className="relative inline-block text-left" key={id}>
      <div>
        <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id={`menu-button-${id}`} aria-expanded="true" aria-haspopup="true">
          Stocks
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby={`menu-button-${id}`} tabIndex="-1">
        <div className="py-1" role="none">
          <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id={`menu-item-${id * 4}`}>Account settings</a>
          <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id={`menu-item-${id * 4 + 1}`}>Support</a>
          <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id={`menu-item-${id * 4 + 2}`}>Lice</a>
          <form method="POST" action="#" role="none">
            <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id={`menu-item-${id * 4 + 3}`}>Sign out</button>
          </form>
        </div>
      </div>
    </div>
  );

  // Функция для создания элемента блога
  const createBlogElement = (blog, index) => (
    <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl m-4" key={index}>
      <div className="flex items-center">
        <img src={blog.imageUrl} alt="blogs tailwind section" className="rounded-t-2xl w-full" />
      </div>
      <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
        <span className="text-indigo-600 font-medium mb-3 block">{blog.date}</span>
        <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">{blog.title}</h4>
        <p className="text-gray-500 leading-6 mb-10">{blog.description}</p>
        <a href="javascript:;" className="cursor-pointer text-lg text-indigo-600 font-semibold">Read more..</a>
      </div>
    </div>
  );

  return (
    <div>
      {/* Поисковая строка */}
      <form className="max-w-lg mx-auto my-4">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
          <button type="submit" className="text-white absolute end-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>

      {/* Контейнер для кнопок */}
      <div id="button-container" className="flex space-x-10 justify-center p-4">
        {[1, 2, 3, 4].map(id => createButton(id))}
      </div>

      {/* Контейнер для блогов */}
      <div id="blogContainer" className="flex flex-wrap justify-center space-x-4 p-4">
        {blogs.map((blog, index) => createBlogElement(blog, index))}
      </div>
    </div>
  );
};

export default News2;

