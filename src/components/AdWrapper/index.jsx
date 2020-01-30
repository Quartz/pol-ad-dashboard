
import React from 'react';
import Ad from 'components/Ad';

// use this for conditional logic to return consistent Ad component despite different possible types of ads as props
const AdWrapper = ( { adData } ) => adData.map( ( ad, idx ) => {
	const { ads, text } = ad;

	if ( !ads ) {
		return (
			<Ad key={`${ad.id}-${idx}`} creativeAd={ad} text={text} />
		);
	}

	const creativeAd = ads.find( ad => ad.html );
	return (
		<Ad ad={ad} creativeAd={creativeAd} text={text} />
	);
} );

export default AdWrapper;
