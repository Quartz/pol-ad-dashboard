import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import API from 'api';
import './App.css';

function App() {
	return (
		<div className="App">
			<API>
				<Router>
					<Routes />
				</Router>
			</API>
		</div>
	);
}

export default App;
