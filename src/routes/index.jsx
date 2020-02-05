import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import AdSearch from 'components/AdSearch';
import Advertiser from 'components/Advertiser';

const Routes = () => (
	<Fragment>
		<Layout>
			<Route exact path="/">
				<Redirect to="/search" />
			</Route>
			<Route path="/search" component={AdSearch} />
			<Route path="/advertiser/:advertiser" component={Advertiser} />
		</Layout>
	</Fragment>
)

export default Routes;
