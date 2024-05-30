import React from 'react'

const BuyCard = ({price}) => {
  return (
    <div className='flex flex-col items-center gap-y-3'>
        <div>Текущая цена {price}₽</div>
        <button className='border border-slate-500 rounded-xl p-3 hover:bg-slate-500 hover:text-white '>Купить</button>
    </div>
  )
}

export default BuyCard