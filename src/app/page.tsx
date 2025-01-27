"use client";
import { client } from "./client";
import { abstractWallet } from "@abstract-foundation/agw-react/thirdweb";
import { defineChain } from "thirdweb";
import { useState } from "react";
import { inAppWallet } from "thirdweb/wallets";



export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const appWallet = inAppWallet({
    auth: {
      options: ["email", "guest"],
    }
  });

  async function handleLogin() {
    try {
      setIsLoading(true);
      setError(null);
      appWallet.connect({
        client,
        strategy: "wallet",
        wallet: abstractWallet(),
        chain: defineChain(2741),
      })





    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg ${isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
      >
        {isLoading ? 'Connecting...' : 'Login'}
      </button>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

    </div>
  );
}