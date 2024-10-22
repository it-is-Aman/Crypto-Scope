import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCryptoContext } from '../CryptoContext';
import { useNavigate } from 'react-router-dom'

function Trending() {
    const { trendingCoins, saveCoin } = useCryptoContext();

    const navigate = useNavigate()
    const handleCoinClick = (coinId) => {
        navigate(`/coin/${coinId}`)
    }

    return (
        <Card className="w-full bg-gray-100">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Trending Cryptocurrencies</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trendingCoins.map((c) => {
                        const coin = c.item
                        return (
                            <Card key={coin.id}
                                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 hover:cursor-pointer"
                                onClick={() => handleCoinClick(coin.id)}
                            >
                                <CardHeader
                                >
                                    <CardTitle className="text-lg font-medium text-gray-800">
                                        <span><img src={coin.thumb} alt="image picture" /></span>
                                        {coin.name} ({coin.symbol})</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="text-sm text-gray-600">
                                            Price: {coin.data.price}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Market Cap: {coin.data.market_cap}
                                        </div>
                                        {/* <Button variant="outline" size="sm" onClick={() => saveCoin(c)} className="mt-2">
                                            Save Coin
                                        </Button> */}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    );
}


export default Trending