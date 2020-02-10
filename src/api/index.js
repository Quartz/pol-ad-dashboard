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
				'Content-Type': 'application/json',
			},
		} );
		const data = res.json();
		return data;
	}

	getAd( adId ) {
		return this.get( `${this.baseURL}/ads_by_text/${adId}` );
	}

	getAdvertiserByName( name ) {
		return this.get( `${this.baseURL}/pages_by_name/${encodeURIComponent( name )}.json` );
	}

	getTopics() {
		return this.get( `${this.baseURL}/topics.json` );
	}

	search( params = {} ) {
		const { poliprobMin = 70, poliprobMax = 100 } = params;
		const parsedParams = Object.keys( params ).map( param => `${param}=${params[param].join( ',' )}` ).join( '&' );
		return this.get( `${this.baseURL}/ads/search.json?${parsedParams}&poliprob=[${poliprobMin},${poliprobMax}]` );
	}

	searchAdsByTopic( topic ) {
		return this.get( `${this.baseURL}/ads/topic=${topic}` );
	}
};

export default new API();
