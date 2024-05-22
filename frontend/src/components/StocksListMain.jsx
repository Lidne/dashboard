import React from 'react';
import StocksList from './StocksList'; // Импорт компонента

function AnotherComponent() {
  return (
    <div>
      <h1>Список акций</h1>
      <StocksList /> {/* Использование компонента StocksList */}
    </div>
  );
}

export default AnotherComponent;