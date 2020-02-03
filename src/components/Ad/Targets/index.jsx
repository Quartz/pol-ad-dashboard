import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import classnames from 'classnames/bind';
import styles from './Targets.module.css';

const cx = classnames.bind( styles );

const TargetButton = ( { target, targetSearch } ) => {

	return (
		<div className={cx( 'button-group' )}>
			<Button.Group>
				<Button onClick={targetSearch( target.target )}>
					{target.target}
				</Button>
				<Button color="olive" onClick={targetSearch( target.target, target.segment )}>
					{target.segment}
				</Button>
			</Button.Group>
		</div>
	);
};

const Targets = ( { history, location, targets } ) => {
	const { search } = location;

	const targetSearch = ( type, segment ) => () => {
		const params = new URLSearchParams( search );
		const targets = JSON.parse( params.get( 'targeting' ) ) || [];

		// do nothing if we already have this target (erroneous click)
		if ( targets && targets.some( target => target[0] === type && target[1] === segment ) ) {
			console.log( 'Target already exists.' );
			return null;
		}

		// otherwise add new target to list and push to history
		const newTargets = targets.concat( [ [ type, segment ] ] );
		params.set( 'targeting', JSON.stringify( newTargets ) );
		history.push( { pathname: '/search', search: params.toString() } );
	};

	return (
		<div className={cx( 'container' )}>
			{
				targets.map( ( target, idx ) => <TargetButton key={`${target.segment}-${idx}`} target={target} targetSearch={targetSearch} /> )
			}
		</div>
	);
};

export default withRouter( Targets );
