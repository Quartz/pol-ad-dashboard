import React from 'react';
import { AuthContext } from './index.jsx';

const withAPI = WrappedComponent => (
	<AuthContext.Consumer>
		{
			props => <WrappedComponent {...props} />
		}
	</AuthContext.Consumer>
);

export default withAPI;
