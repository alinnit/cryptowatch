import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Coin from './Coin'

let App = () => {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
      )
      .then((res) => {
        setCoins(res.data)
      })
      .catch((error) => console.log(error))
  })

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin__app">
      <div className="coin__search">
        <h1 className="coin__text">React + Axios</h1>
        <form>
          <input
            className="coin__input"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
          />
        )
      })}
    </div>
  )
}

export default App
