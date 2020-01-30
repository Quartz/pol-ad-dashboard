import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './AdBrowser.module.css';
import AdWrapper from 'components/AdWrapper';
import API from 'api/';

const cx = classnames.bind( styles );

const AdBrowser = () => {
	const [ adData, setAdData ] = useState( [] );

	// go get some ads on component load
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

	return (
		<div className={cx( 'container' )}>
			<AdWrapper adData={adData} />
		</div>
	);
}
export default AdBrowser;
