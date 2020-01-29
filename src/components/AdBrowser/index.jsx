import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import Ad from 'components/Ad';
// import sampleAd from './sample_ad.json';
import styles from './AdBrowser.module.css';
import API from 'api/';

const cx = classnames.bind( styles );

const AdWrapper = () => {
	const [ adData, setAdData ] = useState( [] );

	useEffect( () => {
		const getLatestAds = async () => {
			const latestAds = await API.search();
			setAdData( latestAds );
		};
		getLatestAds();
	}, [] );

	if ( !adData.length ) {
		return null;
	}

	return adData.map( ad => {
		const { ads, text } = ad;

		if ( !ads ) {
			return (
				<Ad creativeAd={ad} text={text} />
			);
		}

		const creativeAd = ads.find( ad => ad.html );
		return (
			<Ad ad={ad} creativeAd={creativeAd} text={text} />
		);
	} );
};

const AdBrowser = () => (
	<div className={cx( 'container' )}>
		<AdWrapper />
	</div>
);

export default AdBrowser;
