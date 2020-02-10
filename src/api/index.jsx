import React from 'react';
import { Loader, Form } from 'semantic-ui-react';

const DASHBOARD_URL = 'https://dashboard-backend.qz.ai';

const AuthContext = React.createContext();

class API extends React.Component {
	constructor( props ) {
		super( props );
		this.baseURL = DASHBOARD_URL;
		const existingUser = document.cookie.split( ';' ).find( val => val.includes( 'cred' ) );
		let cred = '';
		if ( existingUser ) {
			[ , cred ] = existingUser.split( '=' );
		}
		this.state = {
			cred,
			username: '',
			pass: '',
			loading: false,
			loggedIn: !!existingUser,
		};
	}

	setLogin = async () => {
		const { user, pass } = this.state;
		const cred = btoa( `${user}:${pass}` );
		await this.setState( { cred, loading: true } );
		const res = await this.getTopics();
		if ( !res.error || ( res.error && !res.error === 'You need to sign in or sign up before continuing.' ) ) {
			this.setState( { loggedIn: true, loading: false } );
			document.cookie = `cred=${cred}`;
		} else {
			this.setState( { loading: false } );
		}
	}

	async get( url ) {
		const { cred } = this.state;
		console.log( 'cred', cred );
		const res = await fetch( url, {
			method: 'GET',
			headers: {
				// TODO - plug in actual auth
				Authorization: `Basic ${cred}`,
				'Content-Type': 'application/json',
			},
		} );
		const data = res.json();
		return data;
	}

	getAd = ( adId ) => this.get( `${this.baseURL}/ads_by_text/${adId}` );

	getAdvertiserByName = ( name ) => this.get( `${this.baseURL}/pages_by_name/${encodeURIComponent( name )}.json` );

	getTopics = () => this.get( `${this.baseURL}/topics.json` );

	search = ( params = {} ) => {
		const { poliprobMin = 70, poliprobMax = 100 } = params;
		const parsedParams = Object.keys( params ).map( param => `${param}=${params[param].join( ',' )}` ).join( '&' );
		return this.get( `${this.baseURL}/ads/search.json?${parsedParams}&poliprob=[${poliprobMin},${poliprobMax}]` );
	}

	render() {
		const { loading, loggedIn } = this.state;
		const baseProps = {
			getAd: this.getAd,
			getAdvertiserByName: this.getAdvertiserByName,
			getTopics: this.getTopics,
			search: this.search,
		};

		if ( loading ) {
			return (
				<Loader active={loading} />
			);
		}

		if ( !loggedIn ) {
			return (
				<div>
					Please log in.
					<Form onSubmit={this.setLogin}>
						<Form.Field>
							<label>Username</label>
							<Form.Input onChange={( _, { value } ) => this.setState( { user: value } )} />
						</Form.Field>
						<Form.Field>
							<label>Password</label>
							<Form.Input type="password" onChange={( _, { value } ) => this.setState( { pass: value } )} />
						</Form.Field>
						<Form.Button>Submit</Form.Button>
					</Form>
				</div>
			);
		}

		return (
			<AuthContext.Provider value={{ ...baseProps }}>
				{
					this.props.children
				}
			</AuthContext.Provider>
		);
	}
};

export const withAPI = WrappedComponent => () => (
	<AuthContext.Consumer>
		{
			props => <WrappedComponent {...props} />
		}
	</AuthContext.Consumer>
);

export default API;
