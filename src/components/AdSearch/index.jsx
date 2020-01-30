import React, { useEffect, useState } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import classnames from 'classnames/bind';
import styles from './AdSearch.module.css';
import AdWrapper from 'components/AdWrapper';
import API from 'api/';

const cx = classnames.bind( styles );

const useQuery = () => {
	const searchParams = {};
	const toParse = new URLSearchParams( useLocation().search );
	const keys = toParse.keys();
	for ( const key of keys ) {
		searchParams[key] = toParse.get( key ).split( ',' );
	}
	return searchParams;
};

const AdSearch = ( { location: { search } } ) => {
	const [ adData, setAdData ] = useState( [] );
	const query = useQuery();

	useEffect( () => {
		const getLatestAds = async () => {
			const latestAds = await API.search( query );
			setAdData( latestAds );
		};
		getLatestAds();
	}, [ search ] );

	console.log( adData );

	if ( !adData.length ) {
		return null;
	}

	return (
		<div className={cx( 'container' )}>
			<AdWrapper adData={adData} />
		</div>
	);
};

export default withRouter( AdSearch );
