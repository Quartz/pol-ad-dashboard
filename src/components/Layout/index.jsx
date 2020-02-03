import React from 'react';
import { Button, Divider } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Targets from 'components/Ad/Targets';
import classnames from 'classnames/bind';
import Search from 'components/Search';
import styles from './Layout.module.css';

const cx = classnames.bind( styles );

const TargetFilters = ( { search } ) => {
	const params = new URLSearchParams( search );
	const targets = JSON.parse( params.get( 'targeting' ) );
	const formattedTargets = [];

	if ( !targets || !targets.length ) {
		return null;
	}

	for ( const targetParam of targets ) {
		const [ target, segment ] = targetParam;
		formattedTargets.push( { target, segment } );
	}

	return (
		<div className={cx( 'search-targets' )}>
			<Targets targets={formattedTargets} />
		</div>
	);
};

const Layout = ( { history, location, children } ) => (
	<div className={cx( 'layout' )}>
		<div className={cx( 'left-rail' )}>
			<Button onClick={ () => history.push( location.pathname ) }>
				Clear All Filters
			</Button>
			<Divider />
			<Search />
			<Divider />
			<TargetFilters search={location.search} />
		</div>
		<div className={cx( 'content' )}>
			{
				children
			}
		</div>
	</div>
);

export default withRouter( Layout );
