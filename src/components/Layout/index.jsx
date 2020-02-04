import React from 'react';
import { Button, Checkbox, Divider } from 'semantic-ui-react';
// import { withRouter } from 'react-router-dom';
import { compose, withURLSearchParams } from 'utils';
import { COMMON_TARGETS } from '../constants';
import Targets, { TargetFilters } from 'components/Targets';
import Topics from 'components/Topics';
import classnames from 'classnames/bind';
import Search from 'components/Search';
import styles from './Layout.module.css';

const cx = classnames.bind( styles );

const CommonTargets = () => (
	<div className={cx( 'search-targets' )}>
		<h4 className={cx( 'title' )}>Common Targets:</h4>
		<Targets targets={COMMON_TARGETS} />
	</div>
);

const Layout = ( { history, location: { search, pathname }, toggleParam, children } ) => (
	<div className={cx( 'layout' )}>
		<div className={cx( 'left-rail' )}>
			<Button onClick={() => history.push( pathname )}>
				Clear All Filters
			</Button>
			<Divider />
			<Search />
			<Divider />
			<Checkbox
				label="Only ads without 'Paid For By' disclaimer"
				checked={search.includes( 'no_payer=true' )}
				onClick={() => toggleParam( 'no_payer' )}
			/>
			<Divider />
			<Topics />
			<TargetFilters search={search} />
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

export default withURLSearchParams( Layout );
