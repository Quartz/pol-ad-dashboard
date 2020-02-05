import React, { Fragment, useEffect, useState } from 'react';
import { Loader, Pagination } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { withURLSearchParams } from 'utils';
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
		<Pagination totalPages={pages} activePage={page} onPageChange={setPage} />
	</div>
);

const AdSearch = ( { location: { search }, setParam } ) => {
	const [ adData, setAdData ] = useState( { n_pages: 0, page: '1', total_ads: 0, ads: [] } );
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

	// console.log( adData );

	const setPage = ( _, data ) => setParam( 'page', data.activePage );

	return (
		<Fragment>
			<AdMeta
				pages={adData.n_pages}
				page={adData.page}
				setPage={setPage}
				totalCount={adData.total_ads}
			/>
			<div className={cx( 'container' )}>
				{
					loading
						? (
							<div className={cx( 'container' )}>
								<Loader active={loading} />
							</div>
						) : (
							<AdWrapper adData={adData.ads} />
						)
				}
			</div>
			{
				adData.ads.length > 10 && !loading
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

export default withURLSearchParams( AdSearch );
