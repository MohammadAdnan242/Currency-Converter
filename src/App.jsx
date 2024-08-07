import React from 'react'
import CurrencyConverter from './components/Currencyconverter'
import './App.css'

const App =()=>{
  return (
    <>
    <CurrencyConverter url='https://api.frankfurter.app'/>
    </>
  )
}
export default App
