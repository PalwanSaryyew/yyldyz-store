'use client'

import { TonConnectUIProvider } from "@tonconnect/ui-react"

import { ReactNode } from 'react';

interface TonProviderProps {
  children: ReactNode;
}

const MyTonProvider = ({ children }: TonProviderProps) => {
  return (
    <TonConnectUIProvider manifestUrl="https://coffee-impressed-bird-829.mypinata.cloud/ipfs/bafkreidweekckzvoskn6y5iutxcogjjshicviflvx3rklmnou5dwoacaru">
        {children}
    </TonConnectUIProvider>
  )
}

export default MyTonProvider