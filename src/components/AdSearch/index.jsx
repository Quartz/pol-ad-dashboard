import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader, Pagination } from 'semantic-ui-react';
import { useLocation, useParams } from 'react-router-dom';
import { compose, withURLSearchParams } from 'utils';
import classnames from 'classnames/bind';
import styles from './AdSearch.module.css';
import AdWrapper from 'components/AdWrapper';
import { withAPI } from 'api';

const cx = classnames.bind( styles );

const useQuery = ( pathname ) => {
	const params = useParams();
	const { search } = useLocation();
	const searchParams = {};

	const toParse = new URLSearchParams( search );
	const keys = toParse.keys();
	for ( const key of keys ) {
		searchParams[key] = toParse.get( key ).split( ',' );
	}

	if ( pathname === '/search' ) {
		// don't do anything special for searches.
	}
	else if ( pathname.includes( '/advertiser' ) ) {
		const { advertiser } = params;
		searchParams["advertisers"] = [ JSON.stringify([advertiser]) ]; /* for now, advertisers can be multiple (hence JSON array) and paid for by takes only one.*/
	}
	else if ( pathname.includes( '/payer' ) ) {
		const { payer } = params;
		searchParams["paid_for_by"] = [ payer ]; /* for now, advertisers can be multiple (hence JSON array) and paid for by takes only one. */
	} else {
		// do nothing.
	}
	return searchParams;
};

const AdMeta = ( { pages, page, setPage } ) => (
	<div className={cx( 'meta-container' )}>
		<Pagination totalPages={pages} activePage={page} onPageChange={setPage} />
	</div>
);

AdMeta.propTypes = {
	page: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
	pages: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};

const AdSearch = ( { search: apiSearch, location: { pathname, search }, setParam } ) => {
	const [ adData, setAdData ] = useState( { n_pages: 0, page: 1, total_ads: 0, ads: [] } );
	const [ error, setError ] = useState( '' );
	const [ loading, setLoading ] = useState( true );
	const query = useQuery( pathname );

	useEffect( () => {
		const getLatestAds = async () => {
			setError( '' );
			setLoading( true );
			const data = await apiSearch( query );
			if ( data.error ) {
				setError( data.error );
				setLoading( false );
				return;
			}
			setAdData( data );
			setLoading( false );
		};
		getLatestAds();
	}, [ apiSearch, pathname, search ] );

	const setPage = ( _, data ) => setParam( 'page', data.activePage );

	if ( error ) {
		return (
			<Fragment>
				<h2>Sorry, something went wrong.</h2>
				<p>{error}</p>
			</Fragment>
		);
	}

	return (
		<Fragment>
			<AdMeta
				pages={adData.n_pages}
				page={adData.page}
				setPage={setPage}
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
						/>
					) : null
			}
		</Fragment>
	);
};

AdSearch.propTypes = {
	location: PropTypes.shape( {
		pathname: PropTypes.string.isRequired,
		search: PropTypes.string,
	} ),
	search: PropTypes.func.isRequired,
	setParam: PropTypes.func.isRequired,
};

export default compose( withAPI, withURLSearchParams )( AdSearch );
