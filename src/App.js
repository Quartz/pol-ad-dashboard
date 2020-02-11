import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
// eslint-disable-next-line
import API from 'api';

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
