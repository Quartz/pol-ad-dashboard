import React from 'react';
import classnames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import AdSearch from 'components/AdSearch';
import styles from './Advertiser.module.css';

const cx = classnames.bind( styles );

const Advertiser = () => {
	const { advertiser } = useParams();
	return (
		<div className={cx( 'container' )}>
			<div className={cx( 'advertiser-container' )}>
				<h2>{advertiser}</h2>
			</div>
			<AdSearch />
		</div>
	);
}

export default Advertiser;
