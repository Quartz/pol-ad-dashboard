import React, { Fragment, useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
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

const AdMeta = ( { totalCount, pages, page } ) => (
	<div className={cx( 'meta-container' )}>
		<h4>Total Ads: {totalCount}</h4>
		<h4>Pages: {pages}</h4>
		<h4>Current Page: {page}</h4>
	</div>
)

const AdSearch = ( { location: { search } } ) => {
	const [ adData, setAdData ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const query = useQuery();

	useEffect( () => {
		const getLatestAds = async () => {
			setLoading( true );
			const data = await API.search( query );
			setAdData( data );
			setLoading( false );
		};
		getLatestAds();
	}, [ search ] );

	console.log( adData );

	if ( loading ) {
		return (
			<div className={cx( 'container' )}>
				<Loader active={loading} />
			</div>
		);
	}

	return (
		<Fragment>
			<AdMeta totalCount={adData.total_ads} pages={adData.n_pages} page={adData.page}/>
			<div className={cx( 'container' )}>
				<AdWrapper adData={adData.ads} />
			</div>
		</Fragment>
	);
};

export default withRouter( AdSearch );
