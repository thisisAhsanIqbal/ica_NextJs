'use client'

import InfoHeader from './InfoHeader'
import Header from './Header'
import PromotionalHeader from './PromotionalHeader'
import Breadcrumb from './Breadcrumb'
import Footer from './Footer'
import Template from '../../template'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <InfoHeader />
      <Header />
      <PromotionalHeader />
      <Breadcrumb />
      <main id="main-content">
        <Template>
          {children}
        </Template>
      </main>
      <Footer />
    </>
  )
}

