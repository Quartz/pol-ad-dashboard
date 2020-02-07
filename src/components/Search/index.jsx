import React, { useState, Fragment, useEffect } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { withURLSearchParams } from 'utils';

const Search = ( { location: { search }, setParam, getParam } ) => {
	const [ searchTerm, setSearchTerm ] = useState( getParam( 'search' ) || '' );

	useEffect( () => {
		if ( !search ) {
			setSearchTerm( '' );
		}
	}, [ search ] );

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
