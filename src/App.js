import React, { Component, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import NavbarAdmin from './Component/NavbarAdmin'
import HomeDasboard from './Pages/HomeDashboard'
import Sidebar from "./Component/Sidebar";
import ManageUser from './Pages/ManageUser'
import Transaction from './Pages/Transaction'
import RajaOngkir from './Pages/RajaOngkir'
import PaymentAlert from './Pages/PaymentAlert'
import Css from './Pages/Css'
import { useSelector, useDispatch } from 'react-redux';
import {getWaitingPayment, updatePaymentStatus} from './Redux/Action/TransactionAction'

 const App = () => {

  const userIdfromAuth = 1

    let dispatch = useDispatch()

    useEffect(() => {
      console.log('MULAI USE EFFECT')
      dispatch(getWaitingPayment(userIdfromAuth))
  },[])

  const [protect,setProtect] = useState(true)

  const {waitingPay} = useSelector(state=>state.dataTrans)
  // console.log(waitingPay[0],"INI DARI APP")
  if(waitingPay&&protect){
    let wait = waitingPay.forEach((val)=>{
      const countdownTime = new Date(val.date).getTime() 
      const countTime = countdownTime + 86400000
      const now = new Date().getTime()
      const distance = countTime - now
      if(distance<0){
        console.log('update Payment status failed')
        dispatch(updatePaymentStatus(4,val.id))
      }
      else{
        setProtect(false)
        dispatch(getWaitingPayment(userIdfromAuth))
        return console.log(val,"ini cosole IF semoga bisa")
        
      }
    })
  }

    return (
      <Switch>
      <div>
        <NavbarAdmin/>
      <div className='row '>
        <div className='col-2 w-100 bg-dark'>
        <Sidebar/>
        </div>
        <div className='col-10 bg-light pt-3' >
          <Route path='/' component={HomeDasboard} exact/>
          <Route path='/manage-user' component={ManageUser} />
          <Route path='/transaction' component={Transaction} />
          <Route path='/raja' component={RajaOngkir} />
          {!protect
          ?
          <Route path='/thanks' component={PaymentAlert}/>
          :
          null
          }
          <Route path='/css' component={Css} />
        </div>
        </div>
      </div>
      </Switch>
    )
  }


export default App
