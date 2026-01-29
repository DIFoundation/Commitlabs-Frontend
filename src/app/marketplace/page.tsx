'use client'

import Link from 'next/link'
import { MarketplaceGrid } from '@/components/MarketplaceGrid'
import styles from './page.module.css'

const mockListings = [
  {
    id: '001',
    type: 'Safe' as const,
    score: 95,
    amount: '$50,000',
    duration: '25 days',
    yield: '5.2%',
    maxLoss: '2%',
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    price: '$52,000',
    forSale: true,
  },
  {
    id: '002',
    type: 'Balanced' as const,
    score: 88,
    amount: '$100,000',
    duration: '45 days',
    yield: '12.5%',
    maxLoss: '8%',
    owner: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
    price: '$105,000',
    forSale: true,
  },
  {
    id: '003',
    type: 'Aggressive' as const,
    score: 76,
    amount: '$250,000',
    duration: '80 days',
    yield: '18.7%',
    maxLoss: '100%',
    owner: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
    price: '$—',
    forSale: false,
  },
]

export default function Marketplace() {
  return (
    <main id="main-content" className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink} aria-label="Back to Home">
          ← Back to Home
        </Link>
        <h1>Commitment Marketplace</h1>
        <p>Browse and trade Commitment NFTs</p>
      </header>

      <section className={styles.gridShell} aria-label="Marketplace listings">
        <MarketplaceGrid items={mockListings} />
      </section>
    </main>
  )
}


