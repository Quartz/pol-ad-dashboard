import React, { Fragment } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { COMMON_TARGETS } from './commonTargets';
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
		<Fragment>
			<Divider />
			<div className={cx( 'search-targets' )}>
				<h3 className={cx( 'title' )}>Applied Targets:</h3>
				<Targets targets={formattedTargets} />
			</div>
		</Fragment>
	);
};

const CommonTargets = () => (
	<div className={cx( 'search-targets' )}>
		<h3 className={cx( 'title' )}>Common Targets:</h3>
		<Targets targets={COMMON_TARGETS} />
	</div>
);

const Layout = ( { history, location, children } ) => (
	<div className={cx( 'layout' )}>
		<div className={cx( 'left-rail' )}>
			<Button onClick={() => history.push( location.pathname )}>
				Clear All Filters
			</Button>
			<Divider />
			<Search />
			<TargetFilters search={location.search} />
			<Divider />
			<CommonTargets />
		</div>
		<div className={cx( 'content' )}>
			{
				children
			}
		</div>
	</div>
);

export default withRouter( Layout );
