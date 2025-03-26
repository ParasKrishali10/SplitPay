"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

interface BalanceData {
  profit: number
  loss: number
  balance: number
}

const BalanceCard = () => {
  const [balance, setBalance] = useState<BalanceData>({
    profit: 0,
    loss: 0,
    balance: 0
  })

  const { data: session } = useSession()

  useEffect(() => {
    const fetchBalance = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch(`/api/account?email=${session.user.email}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        })

        if (response.ok) {
          const data = await response.json()
          setBalance(data)
        }
      } catch (error) {
        console.error("Error fetching balance", error)
      }
    }

    fetchBalance()
  }, [session]) // Only re-run when session changes
  const total=balance.profit+balance.loss;
  return (
    <div>
      <div className="bg-gray-900 rounded-lg p-6 flex items-center justify-center">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e11d48"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#10b981"
              strokeWidth="10"
              strokeDasharray="283"
              strokeDashoffset={10+(100 - (100 * balance.profit) / total)}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-4xl font-bold">₹{balance.balance}</p>
            <p className="text-sm text-gray-400">Total Balance</p>
          </div>
        </div>
        <div className="ml-8 space-y-4">
          <div>
            <p className="text-xl text-gray-400">You Owe</p>
            <p className="text-2xl font-bold text-red-400">₹{balance.loss}</p>
          </div>
          <div>
            <p className="text-xl text-gray-400">You Owed</p>
            <p className="text-2xl font-bold text-green-400">₹{balance.profit}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceCard