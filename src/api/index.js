const DASHBOARD_URL = 'http://dashboard.qz.ai';

class API {
	constructor () {
		this.baseURL = DASHBOARD_URL;
	}

	getAd( adId ) {
		return fetch( `${this.baseURL}/ads_by_text/${adId}` );
	}

	searchAds( params ) {
		const parsedParams = Object.keys( params ).map( param => `${param}=${params[param]}` ).join('&');
		return fetch( `${this.baseuRL}/ads/search.json?${parsedParams}` );
	}
};

export default new API();
