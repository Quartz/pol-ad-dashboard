import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';
import AdBrowser from '../components/AdBrowser';

const Routes = () => (
	<Fragment>
		<Layout>
			<Route path="/" component={AdBrowser} />
		</Layout>
	</Fragment>
)

export default Routes;
