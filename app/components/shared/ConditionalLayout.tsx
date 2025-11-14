'use client'

import { usePathname } from 'next/navigation'
import InfoHeader from './InfoHeader'
import Header from './Header'
import PromotionalHeader from './PromotionalHeader'
import Footer from './Footer'
import Template from '../../template'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname?.startsWith('/login') || pathname?.startsWith('/sign-up')

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <>
      <InfoHeader />
      <Header />
      <PromotionalHeader />
      <main id="main-content">
        <Template>
          {children}
        </Template>
      </main>
      <Footer />
    </>
  )
}

