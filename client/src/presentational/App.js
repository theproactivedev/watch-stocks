import React from 'react';
import MenuBar from './MenuBar';
import StockChart from '../containers/StockChart';
import StockForm from '../containers/StockForm';
import StockList from '../containers/StockList';

const App = () => {
  return (
    <div className="container">
      <MenuBar />
      <StockChart />
      <StockForm />
      <StockList />
    </div>
  );
}

export default App;
