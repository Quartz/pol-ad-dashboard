const DASHBOARD_URL = 'http://dashboard.qz.ai';

class API {
	constructor () {
		this.baseURL = DASHBOARD_URL;
	}

	async get( url ) {
		const res = await fetch( url, {
			method: 'GET',
			headers: {
				Authorization: `Basic ${btoa( 'jeremy@qz.com:Lunch?Lunch?Lunch?' )}`,
			},
		} );
		const data = res.json();
		return data;
	}

	getAd( adId ) {
		return this.get( `${this.baseURL}/ads_by_text/${adId}` );
	}

	search( params = {} ) {
		const parsedParams = Object.keys( params ).map( param => `${param}=${params[param]}` ).join( '&' );
		return this.get( `${this.baseURL}/ads/search.json?${parsedParams}` );
	}
};

export default new API();
