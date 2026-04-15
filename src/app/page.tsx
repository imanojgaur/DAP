import { CounterStoreProvider } from '@/providers/counter-store-provider'
import { HomePage } from '@/components/pages/home-page'

export default function Home() {
  return (
    <CounterStoreProvider>
      <HomePage />
    </CounterStoreProvider>
  )
}