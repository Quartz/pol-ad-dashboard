import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import classnames from 'classnames/bind';
import styles from './Targets.module.css';

const cx = classnames.bind( styles );

const TargetButton = ( { isPresent, target, targetSearch } ) => {
	const { target: type, segment } = target;
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
				<Button onClick={targetSearch( isPresent, type )}>
					{target.target}
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
	history,
	location,
	targets,
} ) => {
	const { search } = location;
	const params = new URLSearchParams( search );
	const parsedTargets = JSON.parse( params.get( 'targeting' ) ) || [];
	const formattedParsedTargets = parsedTargets.map( toFormat => ( { target: toFormat[0], segment: toFormat[1] } ) );

	const targetSearch = ( isPresent, type, segment ) => () => {
		let newTargets;
		if ( isPresent ) {
			// remove if we already have this target
			newTargets = parsedTargets.filter( parsedTarget => parsedTarget[0] !== type && parsedTarget[1] !== segment );
		} else {
			// otherwise add new target to list and push to history
			newTargets = parsedTargets.concat( [ [ type, segment ] ] );
		}

		params.set( 'targeting', JSON.stringify( newTargets ) );
		history.push( { pathname: '/search', search: params.toString() } );
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

export default withRouter( Targets );
