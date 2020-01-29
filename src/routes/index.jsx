import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import AdBrowser from '../components/AdBrowser';
import AdSearch from '../components/AdSearch';

const Routes = () => (
	<Fragment>
		<Layout>
			<Route exact path="/">
				<Redirect to="/browse" />
			</Route>
			<Route path="/browse" component={AdBrowser} />
			<Route path="/search" component={AdSearch} />
		</Layout>
	</Fragment>
)

export default Routes;
