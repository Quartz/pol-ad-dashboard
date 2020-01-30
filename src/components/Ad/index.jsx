import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import classnames from 'classnames/bind';
import styles from './Ad.module.css';
// Facebook-ad specific styling
// eslint-disable-next-line
import './fb_ad.scss';

const cx = classnames.bind( styles );

const CreativeAd = ( { html } ) => <div dangerouslySetInnerHTML={{ __html: html }} />;

const AdDetails = ( { ad, creativeAd } ) => {
	const { currency } = ad ? ad.ads.find( subAd => !subAd.id ) : { currency: 'USD' }; // find the FBPAC version of the ad which contains more price data
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
			<h4 className={cx( 'paid-for' )}>Paid for by {`${paid_for_by || 'Unknown'}`}</h4>
			{
				impressions
					? (
						<p className={cx( 'sub' )}>
							<span>{`${currency}`}</span> • <span>{`${impressions} ${impressions > 1 ? 'impressions' : 'impression'}`}</span>
						</p>
					) : null
			}
			<p className={cx( 'sub' )}>
				<span>First seen: {`${createdAt.toLocaleDateString( 'en-US', { dateStyle: 'full', timeStyle: 'long' } )}`}</span>
			</p>
			{
				updated_at
					? (
						<p className={cx( 'sub' )}>
							<span>Last updated: {`${updatedAt.toLocaleDateString( 'en-US', { dateStyle: 'full', timeStyle: 'long' } )}`}</span>
						</p>
					) : null
			}
			<Modal
				dimmer="inverted"
				size="fullscreen"
				trigger={<Button>Ad Details</Button>}
				style={{
					minHeight: '80vh',
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
	const { html } = creativeAd;

	if ( !html ) {
		const adDetails = {
			created_at: creativeAd.creation_date,
			title: creativeAd.text,
		};
		return <AdDetails creativeAd={adDetails} text={text}/>;
	}

	return (
		<div className={cx( 'container' )}>
			<CreativeAd html={html} />
			<AdDetails ad={ad} creativeAd={creativeAd} text={text} />
		</div>
	);
};

export default Ad;
