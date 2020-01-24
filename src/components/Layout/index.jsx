import React, { Fragment } from 'react';
import classnames from 'classnames/bind';
import { Divider, Input } from 'semantic-ui-react';
import styles from './Layout.css';

const cx = classnames.bind( styles );

const PlaceholderSearch = () => (
	<Fragment>
		<Divider />
		<Input icon="search" placeholder="Search" />
	</Fragment>
);

const Layout = ( { children } ) => (
	<div className={cx( 'layout' )}>
		<div className={cx( 'left-rail' )}>
			<PlaceholderSearch />
		</div>
		<div className={cx( 'content' )}>
			{
				children
			}
		</div>
	</div>
);

export default Layout;
