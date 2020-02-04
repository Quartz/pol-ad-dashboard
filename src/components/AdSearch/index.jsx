import React, { Fragment, useEffect, useState } from 'react';
import { Loader, Pagination } from 'semantic-ui-react';
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

const AdMeta = ( { totalCount, pages, page, setPage } ) => (
	<div className={cx( 'meta-container' )}>
		<h4 className={cx( 'meta-title' )}>Total Ads: {totalCount.toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' )}</h4>
		<Pagination totalPages={pages} defaultActivePage={page} onPageChange={setPage} />
	</div>
);

const AdSearch = ( { history, location, location: { search } } ) => {
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

	const setPage = ( _, data ) => {
		const params = new URLSearchParams( search );
		params.set( 'page', data.activePage );
		history.push( { pathname: location.pathname, search: params.toString() } );
	};

	return (
		<Fragment>
			<AdMeta
				pages={adData.n_pages}
				page={adData.page}
				setPage={setPage}
				totalCount={adData.total_ads}
			/>
			<div className={cx( 'container' )}>
				<AdWrapper adData={adData.ads} />
			</div>
			{
				adData.ads.length > 10
					? (
						<AdMeta
							pages={adData.n_pages}
							page={adData.page}
							setPage={setPage}
							totalCount={adData.total_ads}
						/>
					) : null
			}
		</Fragment>
	);
};

export default withRouter( AdSearch );
