const DASHBOARD_URL = 'http://dashboard.qz.ai';

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

	searchAdsByTarget( params ) {
		// sample target query: http://dashboard.qz.ai/ads/search.json?targeting=[["Interest","Sean%20Hannity"]]
		// sample targeting = { targets: { Interest: 'Sean Hannity', Age: '55 and older', MinAge: 55 } }
		if ( !params.targets ) {
			return this.search( params );
		}
	}

	search( params = {} ) {
		const parsedParams = Object.keys( params ).map( param => `${param}=${params[param].join( ',' )}` ).join( '&' );
		return this.get( `${this.baseURL}/ads/search.json?${parsedParams}` );
	}
};

export default new API();
