import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import NavbarAdmin from './Component/NavbarAdmin'
import HomeDasboard from './Pages/HomeDashboard'
import Sidebar from "./Component/Sidebar";
import ManageUser from './Pages/ManageUser'
import Transaction from './Pages/Transaction'
import RajaOngkir from './Pages/RajaOngkir'
import PaymentAlert from './Pages/PaymentAlert'

class App extends Component {
  render() {
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
          <Route path='/thanks' component={PaymentAlert} />
        </div>
        </div>
      </div>
      </Switch>
    )
  }
}

export default App
