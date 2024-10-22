import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCryptoContext } from '../CryptoContext'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'


function Dashboard() {
    const { coinsData,
        saveCoin,
        currency,
        setCurrency,
        page,
        setPage,
        searchCoin,
        resetFunction } = useCryptoContext();

    const navigate = useNavigate()
    const handleCoinClick = (coin) => {
        navigate(`/coin/${coin.id}`)
    }

    return (
        <>
            <Card className="w-full bg-gray-100">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">Crypto Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Input
                                className="pl-10 pr-4 py-2 w-full bg-white text-gray-800 border-gray-300"
                                placeholder="Search cryptocurrencies..."
                                // value=""
                                onChange={(e) => searchCoin(e.target.value)}
                            />
                            <Search className=" left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Select value={currency} onValueChange={setCurrency}>
                                <SelectTrigger className="w-[180px] bg-white text-gray-800 border-gray-300">
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="usd">USD</SelectItem>
                                    <SelectItem value="inr">INR</SelectItem>
                                    <SelectItem value="jpy">JPY</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon" className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                                onClick={resetFunction}
                            >
                                <RefreshCcw className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="bg-white rounded-md shadow">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Asset</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Total Volume</TableHead>
                                        <TableHead>Market Cap</TableHead>
                                        <TableHead>24H</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {coinsData.map((coin) => (
                                        <TableRow key={coin.id} className="cursor-pointer hover:bg-gray-50">
                                            <TableCell onClick={() => handleCoinClick(coin)}>
                                                <div className="flex items-center space-x-2">
                                                    <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                                                </div>
                                            </TableCell>
                                            <TableCell onClick={() => handleCoinClick(coin)}>{coin.name}</TableCell>
                                            <TableCell onClick={() => handleCoinClick(coin)}>{coin.current_price}</TableCell>
                                            <TableCell onClick={() => handleCoinClick(coin)}>{coin.total_volume}</TableCell>
                                            <TableCell onClick={() => handleCoinClick(coin)}>{coin.market_cap}</TableCell>
                                            <TableCell onClick={() => handleCoinClick(coin)} className={coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'} >{coin.price_change_percentage_24h.toFixed(2)}%</TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="sm" onClick={() => saveCoin(coin)}>
                                                    Save
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-end items-center">
                            <div className="flex space-x-2 items-center">
                                <span className='text-gray-800'>Page {page}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                    className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                                >
                                    <ChevronLeft className="h-4 w-4 mr-2" />
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(page + 1)}
                                    // disabled={page >= "for total pages"}
                                    className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default Dashboard;

