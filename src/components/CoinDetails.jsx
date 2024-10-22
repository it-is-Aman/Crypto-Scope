import React, { useState, useEffect } from 'react';import { useParams } from 'react-router-dom';
import { useCryptoContext } from '../CryptoContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowUpIcon, ArrowDownIcon, ExternalLinkIcon, StarIcon, HistoryIcon, NewspaperIcon } from 'lucide-react'

function CoinDetails() {
    const { coinDetails, getCoinData } = useCryptoContext();
    const { coinId } = useParams();

    useEffect(() => {
        if (coinId) {
            getCoinData(coinId);
            console.log(coinId);
        } else {
            console.error("coinId is undefined");
        }
    }, [coinId]);

    if (!coinDetails) return <div className="text-center">Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-2xl bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                    <img src={coinDetails.image} alt={coinDetails.name} className="w-16 h-16" />
                    <div>
                        <CardTitle className="text-2xl font-bold">{coinDetails.name}</CardTitle>
                        <Badge variant="secondary" className="text-sm font-semibold">
                            {coinDetails.symbol.toUpperCase()}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Current Price</p>
                            <p className="text-3xl font-bold">${coinDetails.current_price}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">24h Change</p>
                            <p className={`text-xl font-semibold flex items-center ${coinDetails.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {coinDetails.price_change_percentage_24h >= 0 ? (
                                    <ArrowUpIcon className="w-5 h-5 mr-1" />
                                ) : (
                                    <ArrowDownIcon className="w-5 h-5 mr-1" />
                                )}
                                {Math.abs(coinDetails.price_change_percentage_24h).toFixed(2)}%
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Market Cap</p>
                            <p className="text-xl font-semibold">${coinDetails.market_cap}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">24h Volume</p>
                            <p className="text-xl font-semibold">${coinDetails.total_volume}</p>
                        </div>
                    </div>
                </CardContent>
                <Separator className="my-4" />
                <CardFooter className="flex flex-col items-start space-y-4">
                    <div className="w-full">
                        <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <a href={coinDetails.website} target="_blank" rel="noopener noreferrer">
                                    <ExternalLinkIcon className="w-4 h-4 mr-2" />
                                    Website
                                </a>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                                <a href={coinDetails.explorer} target="_blank" rel="noopener noreferrer">
                                    <HistoryIcon className="w-4 h-4 mr-2" />
                                    Explorer
                                </a>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                                <a href={coinDetails.forum} target="_blank" rel="noopener noreferrer">
                                    <NewspaperIcon className="w-4 h-4 mr-2" />
                                    Forum
                                </a>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                                <a href={coinDetails.reddit} target="_blank" rel="noopener noreferrer">
                                    <StarIcon className="w-4 h-4 mr-2" />
                                    Reddit
                                </a>
                            </Button>
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                        <p className="text-sm text-gray-600">
                            This information is for educational purposes only. Do not treat it as investment advice.
                            Cryptocurrency investments are subject to high market risks. Please do your own research before making any investment decisions.
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}



export default CoinDetails