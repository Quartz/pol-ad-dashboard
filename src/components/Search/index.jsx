import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
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

Search.propTypes = {
	getParam: PropTypes.func.isRequired,
	location: PropTypes.shape( {
		search: PropTypes.string,
	} ),
	setParam: PropTypes.func.isRequired,
};

export default withURLSearchParams( Search );
