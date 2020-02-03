import React from 'react';
import AdDetails, { CreativeAd } from './AdDetails';
import classnames from 'classnames/bind';
import TargetButton from './TargetButton';
import styles from './Ad.module.css';
// Facebook-ad specific styling
// eslint-disable-next-line
import './fb_ad.scss';

const cx = classnames.bind( styles );

const Ad = ( { ad, creativeAd, text } ) => {
	const {
		html,
		targets,
		targetings,
	} = creativeAd;

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
			{
				targetings && targetings[0]
					? (
						<div dangerouslySetInnerHTML={{ __html: targetings[0] }} />
					) : null
			}
			{
				targets && targets[0]
					? (
						<div className={cx( 'targets' )}>
							{
								targets.map( target => <TargetButton target={target} /> )
							}
						</div>
					) : null
			}
			<AdDetails ad={ad} creativeAd={creativeAd} text={text} />
		</div>
	);
};

export default Ad;
