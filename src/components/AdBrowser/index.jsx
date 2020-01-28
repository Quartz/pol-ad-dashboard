import React from 'react';
import classnames from 'classnames/bind';
import Ad from 'components/Ad';
import sampleAd from './sample_ad.json';
import styles from './AdBrowser.module.css';

const cx = classnames.bind( styles );

const AdWrapper = ( { ad = sampleAd } ) => {
	// TODO: logic for retrieving ads
	const { ads, text } = ad;
	const creativeAd = ads.find( ad => ad.html );
	return <Ad ad={ad} creativeAd={creativeAd} text={text} />;
};

const AdBrowser = () => (
	<div className={cx( 'container' )}>
		<AdWrapper />
	</div>
);

export default AdBrowser;
