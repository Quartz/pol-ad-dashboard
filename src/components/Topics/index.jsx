import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { TOPICS } from '../constants';

const topicOptions = () => TOPICS.map( topic => ( { key: topic, value: topic, text: topic } ) );

const TopicsFilter = ( { history, location: { search } } ) => {

	const setTopic = ( _, data ) => {
		const { value } = data;
		const params = new URLSearchParams( search );
		if ( value !== '' ) {
			params.set( 'topic', value.toLowerCase() );
		} else {
			params.delete( 'topic' );
		}
		console.log( params.toString() );
		history.push( { pathname: '/search', search: params.toString() } );
	};

	return (
		<div className="container">
			<h4>Topic:</h4>
			<Dropdown
				clearable
				options={topicOptions()}
				onChange={setTopic}
				placeholder="Topic"
				search
				selection
			/>
		</div>
	);
};

export default withRouter( TopicsFilter );
