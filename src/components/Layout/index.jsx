import React from 'react';
import classnames from 'classnames/bind';
import Search from 'components/Search';
import styles from './Layout.module.css';

const cx = classnames.bind( styles );

const Layout = ( { children } ) => (
	<div className={cx( 'layout' )}>
		<div className={cx( 'left-rail' )}>
			<Search />
		</div>
		<div className={cx( 'content' )}>
			{
				children
			}
		</div>
	</div>
);

export default Layout;
