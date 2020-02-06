const DASHBOARD_URL = 'https://dashboard-backend.qz.ai';

class API {
	constructor () {
		this.baseURL = DASHBOARD_URL;
	}

	async get( url ) {
		const res = await fetch( url, {
			method: 'GET',
			headers: {
				// TODO - plug in actual auth
				Authorization: `Basic ${btoa( 'jeremy@qz.com:Lunch?Lunch?Lunch?' )}`,
			},
		} );
		const data = res.json();
		return data;
	}

	getAd( adId ) {
		return this.get( `${this.baseURL}/ads_by_text/${adId}` );
	}

	searchAdsByTopic( topic ) {
		return this.get( `${this.baseURL}/ads/topic=${topic}` );
	}

	getAdvertiserByName( name ) {
		return this.get( `${this.baseURL}/pages_by_name/${encodeURI( name )}.json` );
	}

	search( params = {} ) {
		const parsedParams = Object.keys( params ).map( param => `${param}=${params[param].join( ',' )}` ).join( '&' );
		return this.get( `${this.baseURL}/ads/search.json?${parsedParams}` );
	}
};

export default new API();
