import React, { Fragment } from 'react';
import { withURLSearchParams } from 'utils';
import { Button, Divider, Icon, Label } from 'semantic-ui-react';
import classnames from 'classnames/bind';
import styles from './Targets.module.css';

const cx = classnames.bind( styles );

export const TargetFilters = ( { getParam } ) => {
	const targets = JSON.parse( getParam( 'targeting' ) );
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
				<h4 className={cx( 'title' )}>Applied Targets:</h4>
				<WrappedTargets targets={formattedTargets} />
			</div>
		</Fragment>
	);
};

const TargetButton = ( { isPresent, target, targetSearch } ) => {
	const { target: type, segment, count } = target;
	return (
		<div className={cx( 'button-group' )}>
			<Button.Group>
				{
					isPresent
						? (
							<Button icon color="red" onClick={targetSearch( isPresent, type, segment )}>
								<Icon name="close" />
							</Button>
						) : null
				}
				<Button onClick={targetSearch( isPresent, type )} as="a" labelPosition="right">
					{
						count && <Label pointing="right">{count}</Label>
					}
					<Button>
						{target.target}
					</Button>
				</Button>
				{
					target.segment
						? (
							<Button color="olive" onClick={targetSearch( isPresent, type, segment )}>
								{target.segment}
							</Button>
						) : null
				}
			</Button.Group>
		</div>
	);
};

const Targets = ( {
	getParam,
	setParam,
	targets,
} ) => {
	const parsedTargets = JSON.parse( getParam( 'targeting' ) ) || [];
	const formattedParsedTargets = parsedTargets.map( toFormat => ( { target: toFormat[0], segment: toFormat[1] } ) );

	const targetSearch = ( isPresent, type, segment ) => () => {
		let newTargets;
		if ( isPresent ) {
			// remove if we already have this target
			newTargets = parsedTargets.filter( parsedTarget => parsedTarget[1] ? ( parsedTarget[0] !== type || parsedTarget[1] !== segment ) : parsedTarget[0] !== type );
		} else {
			// otherwise add new target to list and push to history
			newTargets = parsedTargets.concat( [ [ type, segment ] ] );
		}
		setParam( 'targeting', newTargets.length ? JSON.stringify( newTargets ) : '' );
	};

	return (
		<div className={cx( 'container' )}>
			{
				targets.map( ( target, idx ) => {
					const isPresent = formattedParsedTargets.some( item => target.target === item.target && target.segment === item.segment );
					return (
						<TargetButton key={`${target.segment}-${idx}`} target={target} targetSearch={targetSearch} isPresent={isPresent} />
					);
				} )
			}
		</div>
	);
};

const WrappedTargets = withURLSearchParams( Targets );

export default WrappedTargets;
