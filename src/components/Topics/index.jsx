import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { withURLSearchParams } from 'utils';
import { TOPICS } from '../constants';

const topicOptions = () => TOPICS.map( topic => ( { key: topic, value: topic, text: topic } ) );

const TopicsFilter = ( { setParam } ) => (
	<div className="container">
		<h4>Topic:</h4>
		<Dropdown
			clearable
			options={topicOptions()}
			onChange={( _, data ) => setParam( 'topic', data.value.toLowerCase() )}
			placeholder="Topic"
			search
			selection
			fluid
		/>
	</div>
);

export default withURLSearchParams( TopicsFilter );
