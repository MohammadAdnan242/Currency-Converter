import React, { useEffect, useState } from 'react'
import './Currencyconverter.css'
const CurrencyConverter =({url})=>{
    const [currencies,Setcurrrencies] =useState([])
   const [error,seterror] = useState('')
   const[amount,setAmount] =useState(1)
   const[fromCurrency,setFromCurrency] =useState('GBP')
   const[ToCurrency,setToCurrency] =useState('USD')
   const[ConvertedAmnt,setConvertedAmnt] =useState(0)

    useEffect(()=>{fetchCurrencies()},
    []) 
    useEffect(()=>{fetchRate()},
    [amount,fromCurrency,ToCurrency]) 

    const sendRequest=async (endpoint)=>{
       try{
        const response = await fetch(endpoint)
        if(!response.ok){
          seterror("Try again")
          return 
        }
        const data = await response.json();
        console.log('data=',data)
        return data ;
       }
       catch (error){
          console.error(error)
          seterror("Service is not available try again later")
       }
    }
  const fetchCurrencies =async()=>{
     const data = await sendRequest(`${url}/currencies`)
     console.log("fetchCurrencies=",data)
    //  return data
     Setcurrrencies(Object.keys(data))
  }
  const fetchRate =async()=>{
     const data = await sendRequest(`${url}/latest?amount=${amount}&from=${fromCurrency}&to=${ToCurrency}`)
     setConvertedAmnt(data.rates[ToCurrency].toFixed(2))
     console.log("fetchRate=",data)
    
  }
    return (
        <>
       <div className='currency-converter'>
       <h2> Convert currency </h2>
       {error && (<h2 className='error'>{error}</h2>)}
       <form>
           <div>
             <label>Amount</label>
             <input 
             type='number'
             value={amount}
              onChange={(e)=>setAmount(e.target.value)}
              />
           </div>

           <div>
              <label>From:</label>
              <select
                value={fromCurrency}
                onChange = {(e)=>setFromCurrency(e.target.value)}
              required>
                {currencies.map((currency)=> (
                    <option value={currency} key={`from_${currency}`}>
                         {currency}
                    </option>
                )) }
              </select>
           </div>
           <div>
              <label>To:</label>
              <select
                value={ToCurrency}
                onChange = {(e)=>setToCurrency(e.target.value)}
              required>
              {currencies.map((currency)=> (
                    <option value={currency} key={`to_${currency}`}>
                         {currency}
                    </option>
                )) }

              </select>
           </div>
       </form>
       
       <h2>
        {amount} {fromCurrency} = {ConvertedAmnt} {ToCurrency}
       </h2>
       
       </div>
        </>
    )
}

export default CurrencyConverter