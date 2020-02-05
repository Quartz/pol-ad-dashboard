import React from 'react';
import { Button, Checkbox, Divider } from 'semantic-ui-react';
import { withURLSearchParams } from 'utils';
import { COMMON_TARGETS_GROUPED } from '../constants';
import Targets, { TargetFilters } from 'components/Targets';
import Topics from 'components/Topics';
import classnames from 'classnames/bind';
import Search from 'components/Search';
import styles from './Layout.module.css';

const cx = classnames.bind( styles );

const CommonTargets = () => (
	<div className={cx( 'search-targets' )}>
		<h4 className={cx( 'title' )}>Common Targets:</h4>
		<ul className={cx( 'target-list' )}>
			{
				Object.keys( COMMON_TARGETS_GROUPED ).sort().map( ( target, idx ) => {
					const vals = COMMON_TARGETS_GROUPED[target].map( val => ( { target, segment: val } ) );
					return (
						<li className={cx( 'target-item' )} key={idx}>
							<details className={cx( 'target-details' )}>
								<summary>
									{target}
								</summary>
								<div className={cx( 'target-group' )}>
									<Targets targets={vals} />
								</div>
							</details>
						</li>
					);
				} )
			}
		</ul>
	</div>
);

const Layout = ( {
	children,
	getParam,
	history,
	location: { search, pathname },
	toggleParam,
} ) => (
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
			<TargetFilters getParam={getParam} />
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
