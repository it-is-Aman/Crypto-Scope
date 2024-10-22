import React, { useState, useEffect, createContext, useContext } from 'react';

const CryptoContext = createContext();

export const useCryptoContext = () => useContext(CryptoContext);

export const CryptoContextProvider = ({ children }) => {

  const coingecoKey = import.meta.env.VITE_COINGECKO_API_KEY

  const [coinsData, setCoinsData] = useState([]);
  const [savedCoins, setSavedCoins] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [coinDetails, setCoinDetails] = useState("");


  const [currency, setCurrency] = useState("usd")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)


  const fetchCoins = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': coingecoKey }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=${perPage}&page=${page}`, options)
      const data = await response.json();
      setCoinsData(data)
    } catch (error) {
      console.error('Error fetching Coins:', error);
    }
  };

  const fetchTrendingCoins = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': coingecoKey }
    };

    try {
      const response = await fetch('https://api.coingecko.com/api/v3/search/trending', options)
      const data = await response.json();
      setTrendingCoins(data.coins)
    } catch (error) {
      console.error('Error fetching TrendingCoins:', error);
    }
  };

  const getCoinData = async (CoinId) => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': coingecoKey }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${CoinId}`, options);
      const data = await response.json();

      const transformedData = {
        name: data.name,
        symbol: data.symbol,
        image: data.image.large,
        current_price: data.market_data.current_price[currency],
        price_change_percentage_24h: data.market_data.price_change_percentage_24h,
        market_cap: data.market_data.market_cap[currency],
        total_volume: data.market_data.total_volume[currency],
        website: data.links.homepage[0],
        explorer: data.links.blockchain_site[0],
        forum: data.links.official_forum_url[0],
        reddit: data.links.subreddit_url,
      };

      setCoinDetails(transformedData);
    } catch (err) {
      console.error('Error fetching coin details:', err);
    }
  };


  const saveCoin = (coin) => {
    setSavedCoins((prevSavedCoins) => {
      // Checks if at least one element in the array passes the test implemented by the provided function.
      if (!prevSavedCoins.some(savedCoin => savedCoin.id === coin.id)) {
        return [...prevSavedCoins, coin];
      }
      return prevSavedCoins;
    });
  }

  const deleteCoin = (coinId) => {
    setSavedCoins((prevSavedCoins) => {
      return prevSavedCoins.filter((item) => item.id !== coinId)
    })
  }

  const searchCoin = (coinName) => {
    if (coinName.trim() === "") {
      fetchCoins()
    }
    else {
      const filteredCoins = coinsData.filter(coin => coin.name.toLowerCase().includes(coinName.toLowerCase()))
      setCoinsData(filteredCoins)
    }
  }

  const resetFunction = () => {
    fetchCoins()
  }

  useEffect(() => {
    fetchCoins();
    fetchTrendingCoins();
  }, [currency, page, savedCoins]);



  return (
    <CryptoContext.Provider value={{
      coinsData,
      savedCoins,
      trendingCoins,
      saveCoin,
      currency,
      setCurrency,
      deleteCoin,
      page,
      setPage,
      coinDetails,
      getCoinData,
      searchCoin,
      resetFunction
    }}>
      {children}
    </CryptoContext.Provider>
  );
}