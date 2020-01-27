import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import classnames from 'classnames/bind';
import styles from './Ad.module.css';
import API from '../../api';
// Facebook-ad specific styling
// eslint-disable-next-line
import './fb_ad.scss';

const cx = classnames.bind( styles );

const CreativeAd = ( { html } ) => <div dangerouslySetInnerHTML={{ __html: html }} />;

const AdDetails = ( { ad, creativeAd } ) => {
	const { currency } = ad.ads.find( subAd => !subAd.id ); // find the FBPAC version of the ad which contains more price data
	const {
		created_at,
		impressions,
		paid_for_by,
		title,
		updated_at,
		html,
	} = creativeAd;

	const createdAt = new Date( created_at );
	const updatedAt = new Date( updated_at );
	return (
		<div
			className={cx( 'details-container' )}
		>
			<h3 className={cx( 'title' )}>{title}</h3>
			<h4 className={cx( 'paid-for' )}>Paid for by {`${paid_for_by}`}</h4>
			<p className={cx( 'sub' )}>
				<span>{`${currency}`}</span> • <span>{`${impressions} ${impressions > 1 ? 'impressions' : 'impression'}`}</span>
			</p>
			<p className={cx( 'sub' )}>
				<span>First seen: {`${createdAt.toLocaleDateString( 'en-US', { dateStyle: 'full', timeStyle: 'long' } )}`}</span>
			</p>
			<p className={cx( 'sub' )}>
				<span>Last updated: {`${updatedAt.toLocaleDateString( 'en-US', { dateStyle: 'full', timeStyle: 'long' } )}`}</span>
			</p>
			<Modal
				dimmer="inverted"
				size="fullscreen"
				trigger={<Button>Ad Details</Button>}
				style={{
					height: '80vh',
				}}
			>
				<div className={cx( 'modal-content' )}>
					<CreativeAd html={html} />
					<div className={cx( 'right-rail' )}>
						<p>Placeholder content (awaiting further ad data)</p>
					</div>
				</div>
			</Modal>
		</div>
	);
};

const Ad = ( { ad, creativeAd, text } ) => {
	const { id, html } = creativeAd;

	if ( !id ) {
		return null;
	}

	return (
		<div className={cx( 'container' )}>
			<CreativeAd html={html} />
			<AdDetails ad={ad} creativeAd={creativeAd} text={text} />
		</div>
	);
};

export default Ad;
