import React from 'react';
import PropTypes from 'prop-types';
import AdDetails, { CreativeAd } from './AdDetails';
import classnames from 'classnames/bind';
import Targets from '../Targets';
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
		return <AdDetails creativeAd={creativeAd} text={text}/>;
	}

	return (
		<div className={cx( 'container' )}>
			<CreativeAd html={html} />
			{
				targetings && targetings[0] && targetings[0][0] === '<' // cleanup since sometimes an ad target isn't html
					? (
						<div className="targetingHtml" dangerouslySetInnerHTML={{ __html: targetings[0] }} />
					) : null
			}
			{
				targets && targets[0]
					? (
						<Targets targets={targets} inAd={true}/>
					) : null
			}
			<AdDetails ad={ad} creativeAd={creativeAd} text={text} />
		</div>
	);
};

Ad.propTypes = {
	ad: PropTypes.object,
	creativeAd: PropTypes.object,
	text: PropTypes.string,
};

export default Ad;
