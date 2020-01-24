import React, { Fragment } from 'react';
import sampleAd from './sample_ad.json';
import './fb_ad.scss';

const Ad = ( { ad: {
	id,
	html,
} } ) => {
	if ( !id ) {
		return null;
	}

	return (
		<div className="container">
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
};

const AdWrapper = ( { ad = sampleAd } ) => {
	const { ads } = ad;
	return ads.map( ad => <Ad ad={ad} /> );
};

const AdBrowser = () => (
	<Fragment>
		<AdWrapper />
	</Fragment>
);

export default AdBrowser;
