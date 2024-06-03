import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { StarIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const UserProfile = () => {
  const [api, contextHolder] = notification.useNotification();
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [balance, setBalance] = useState(0);
  const [follow, setFollow] = useState(null);
  const [secdata, setSecData] = useState(null);
  const [cost, setCost] = useState(0);

  const openNotification = (descr) => {
    api.info({
      message: `Ошибка`,
      description: descr,
      placement: "topRight",
      duration: 2,
    });
  };

  const fetchUser = () => {
    axios
      .all([
        axios.get(`http://localhost/get_user_info_by_token`, {
          withCredentials: true,
        }),
        axios.get(`http://localhost/portfolio/shares`, {
          withCredentials: true,
        }),
        axios.get(`http://localhost/portfolio/balance`, {
          withCredentials: true,
        }),
        axios.get(`http://localhost/portfolio/follow`, {
          withCredentials: true,
        }),
      ])
      .then(
        axios.spread((info, p, balance, follow) => {
          // Handle the output of each request
          console.log(info.data, p.data, balance.data);
          setUser(info.data);
          setPortfolio(p.data);
          const prices = Object.keys(p.data).map(
            (item) => p.data[item].price * p.data[item].amount
          );
          setCost(prices.reduce((partialSum, a) => partialSum + a, 0));
          setBalance(balance.data.balance);
          setFollow(follow.data);
        })
      )
      .catch((error) => {
        // Handle errors if any request fails
        openNotification("Что-то пошло не так");
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <div className="px-4 sm:px-9">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Аккаунт
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Личная информация и избранное
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-9">
            <dt className="text-sm font-medium leading-6 text-gray-900">Имя</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user != null ? user.username : "None"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-9">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Электронная почта
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user != null ? user.email : "None"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-9">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Баланс
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user != null ? balance : "None"} ₽
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-9">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Портфель
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div>Стоимость: {cost} ₽</div>
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                {user == null
                  ? "None"
                  : Object.keys(portfolio).map((item) => {
                      return (
                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                          <div className="flex w-0 flex-1 items-center">
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                              <span className="truncate font-medium">
                                {portfolio[item].shortname}
                              </span>
                              <span className="flex-shrink-0 text-gray-400">
                                {item}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href="#"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              {portfolio[item].amount} x {portfolio[item].price} ₽
                            </a>
                          </div>
                        </li>
                      );
                    })}
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-9">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Избранные акции
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <StarIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Gazprom</span>
                      <span className="flex-shrink-0 text-gray-400">GZP</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      476$
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <StarIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Lukoil</span>
                      <span className="flex-shrink-0 text-gray-400">LKO</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      198$
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <StarIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Facebook</span>
                      <span className="flex-shrink-0 text-gray-400">FCB</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      32$
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <StarIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Apple</span>
                      <span className="flex-shrink-0 text-gray-400">APL</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      56$
                    </a>
                  </div>
                </li>

                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <StarIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Sberbank</span>
                      <span className="flex-shrink-0 text-gray-400">SBR</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      43$
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default UserProfile;
