import React from 'react'
import Hero from '../../components/hero/Hero'
import StockExplorer from '../../components/StockExplorer'
import StockGrid from '../../components/StockGrid'

const Home:React.FC = () => {
  return (
    <>
    <Hero/>
    <StockExplorer/>
    <StockGrid/>
    </>
  )
}

export default Home

