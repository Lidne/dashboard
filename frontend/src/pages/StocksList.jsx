import React from 'react';


const stocks = [
  {
    ticker: 'YNDX',
    name: 'Yandex',
    price: '43$',
    imageUrl:
      'https://habrastorage.org/getpro/moikrug/uploads/company/548/669/435/logo/big_586e9aeb81f9123e31337c951432b4ba.png',

  },
  {
    ticker: 'LKL',
    name: 'Lukoil',
    price: '$89',
    imageUrl:
      'https://vtortehmix.ru/upload/iblock/785/lukoil.png',

  },
  {
    ticker: 'FCB',
    name: 'Facebook',
    price: '43$',
    imageUrl:
      'https://logowik.com/content/uploads/images/facebook-new-2023-icon9594.logowik.com.webp',

  },
  {
    ticker: 'GZP',
    name: 'Gazprom',
    price: '423$',
    imageUrl:
      'https://yt3.googleusercontent.com/o6fufkZmnPAhH3f4Muk-CDiEVupgo1aCN-HXYgWCVvWyxSpJ6MKKWnRVTNpUU6ZFpbgZB_aT_g=s900-c-k-c0x00ffffff-no-rj',

  }
  
]

export default function Example() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {stocks.map((person) => (
        <li key={person.name} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{person.ticker}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.name}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{person.price}</p>
            { (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}