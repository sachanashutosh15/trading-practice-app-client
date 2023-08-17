import { useEffect, useState } from 'react';
import './App.css';
import LineChart from './components/chart';

export default function App () {
  let [ stockSymbol, setStockSymbol ] = useState("");
  let [ stockSymbolsArr, setStockSymbolsArr] = useState([]);
  let [ searchInput, setSearchInput ] = useState("");
  let [ filteredStockSymbolsArr, setFilteredStockSymbolsArr ] = useState([...stockSymbolsArr]);

  const urlForStockSymbols = "http://localhost:5000/getAllSymbols";

  function handleInputChange(event) {
    setSearchInput(event.target.value);
  }

  useEffect(() => {
    fetch(urlForStockSymbols)
    .then((res) => {
      res.json()
      .then(res => {
        setStockSymbolsArr([
          ...res.symbols
        ]);
        setFilteredStockSymbolsArr([
          ...res.symbols
        ])
      })
    })
  }, [])

  useEffect(() => {
    if (searchInput) {
      setFilteredStockSymbolsArr(stockSymbolsArr.filter((symbol) => 
        symbol.includes(searchInput.toUpperCase())
      ))
      console.log(filteredStockSymbolsArr.length);
    }
  }, [searchInput])

  return (
    <div className="app-container">
      <div className='app-menu'>
        <div className='search-input-container'>
          <input
            placeholder='Search Stock'
            className='stock-search-input-field'
            onChange={handleInputChange}
          ></input>
        </div>
        <DropDown stockSymbolsArr={filteredStockSymbolsArr} setStockSymbol={setStockSymbol} />
      </div>
      <LineChart stockSymbol={stockSymbol} />
    </div>
  );
};

function DropDown({ stockSymbolsArr, setStockSymbol }) {
  const symbolsToRender = stockSymbolsArr?.slice(0, 100);
  function setStockSymbolValue(stockSymbol) {
    setStockSymbol(stockSymbol);
  }
  return (
    <div>
      {symbolsToRender?.map((symbol, index) => <div key={index} >
        <h6
          onClick={()=>{setStockSymbolValue(symbol)}}
          className='stock-symbol-option'
        >{symbol}</h6>
      </div>)}
    </div>
  )
}