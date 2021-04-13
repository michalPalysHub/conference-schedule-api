import React from 'react';
import './App.css';

import {Schedule} from './components/Schedule'
import {Presentations} from './components/Presentations'

import {Reminders} from './components/reminders/Reminders'
import {AddReminder} from './components/reminders/AddReminder'
import {ChangeReminder} from './components/reminders/ChangeReminder'

import {About} from './components/users/About'
import {Update} from './components/users/Update'
import {Register} from './components/users/Register'
import {Authorize} from './components/users/Authorize'

import {Navigation} from './components/Navigation'

import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
  	<BrowserRouter>
  		<div className="container">
  			<h2 className="m-3 d-flex justify-content-center">
  				Conference Schedule API
  			</h2>
  			<h5 className="m-3 d-flex justify-content-center">
  				Example APIs for Internet Engineering classes 2020.
  			</h5>
  			<Navigation />
  			<Switch>
  				<Route path='/' component={Schedule} exact />
				<Route path='/presentations' component={Presentations}/>
  				<Route path='/reminders' component={Reminders} exact/>
				<Route path='/reminders/add' component={AddReminder}/>
				<Route path='/reminders/change' component={ChangeReminder}/>
				<Route path='/schedule' component={Schedule}/>
				<Route path='/about' component={About}/>
				<Route path='/update' component={Update}/>
				<Route path='/register' component={Register}/>
  				<Route path='/authorize' component={Authorize}/>
  			</Switch>
    	</div>
  	</BrowserRouter>
  );
}

export default App;
