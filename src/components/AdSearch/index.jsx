import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames/bind';
import Ad from 'components/Ad';
import styles from './AdSearch.module.css';
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

	console.log( adData );

	return adData.map( ( ad, idx ) => {
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
};

const AdSearch = ( { match, location } ) => {
	console.log( match );
	console.log( location );
	return (
		<div className={cx( 'container' )}>
			<AdWrapper />
		</div>
	);
};

export default withRouter( AdSearch );
