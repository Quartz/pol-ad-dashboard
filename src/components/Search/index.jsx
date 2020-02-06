import React, { useState, Fragment } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { withURLSearchParams } from 'utils';

const Search = ( { setParam, getParam } ) => {
	const [ searchTerm, setSearchTerm ] = useState( getParam( 'search' ) || '' );

	return (
		<Fragment>
			<Form onSubmit={() => setParam( 'search', searchTerm )}>
				<Input
					icon="search"
					placeholder="Search"
					onChange={( e ) => setSearchTerm( e.target.value )}
					value={searchTerm}
					fluid
				/>
			</Form>
		</Fragment>
	);
};

export default withURLSearchParams( Search );
