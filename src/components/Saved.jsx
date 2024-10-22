import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useCryptoContext } from '../CryptoContext'
import { useNavigate } from 'react-router-dom'

export default function Saved() {
  const { savedCoins, deleteCoin } = useCryptoContext()
  const navigate = useNavigate()
  const handleCoinClick = (coin) => {
    navigate(`/coin/${coin.id}`)
  }
  return (
    <Card className="w-full bg-gray-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Saved Cryptocurrencies</CardTitle>
      </CardHeader>
      <CardContent>
        {savedCoins.length === 0 ? (
          <p className="text-gray-600">You haven't saved any cryptocurrencies yet.</p>
        ) : (
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
              {savedCoins.map((coin) => (
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
                    <Button variant="outline" size="sm" onClick={() => deleteCoin(coin.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}