import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { compose, withURLSearchParams } from 'utils';
import { withAPI } from 'api';

const topicOptions = ( topics ) => topics
	.map( ( [ topic, topicId ] ) => ( { key: topic, value: topicId, text: topic } ) )
	.sort( ( { key: keyA }, { key: keyB } ) => keyA > keyB ? 1 : -1 );

const TopicsFilter = ( { getTopics: getTopicsFromAPI, setParam } ) => {
	const [ topics, setTopics ] = useState( [] );

	useEffect( () => {
		const getTopics = async () => {
			const { topics } = await getTopicsFromAPI();
			const topicValues = topicOptions( topics );
			setTopics( topicValues );
		};
		getTopics();
	}, [] );

	return (
		<div className="container">
			<h4>Topic:</h4>
			<Dropdown
				clearable
				fluid
				options={topics}
				onChange={( _, data ) => setParam( 'topic_id', data.value )}
				placeholder="Topic"
				search
				selection
			/>
		</div>
	);
}

export default compose( withAPI, withURLSearchParams )( TopicsFilter );
