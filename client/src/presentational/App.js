import React from 'react';
import MenuBar from './MenuBar';
import StockChart from '../containers/StockChart';
import StockForm from '../containers/StockForm';

const App = () => {
  return (
    <div className="container">
      <MenuBar />
      <StockChart />
      <StockForm />
    </div>
  );
}

export default App;
