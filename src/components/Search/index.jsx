import React, { useState, Fragment } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const Search = ( { history, location: { search } } ) => {
	const [ searchTerm, setSearchTerm ] = useState( '' );

	const onSubmit = () => {
		const params = new URLSearchParams( search );
		if ( searchTerm === '' ) {
			params.delete( 'search' );
			params.delete( 'page' );
		} else {
			params.set( 'search', searchTerm );
		}
		history.push( { pathname: '/search', search: params.toString() } );
	};

	return (
		<Fragment>
			<Form onSubmit={onSubmit}>
				<Input
					icon="search"
					placeholder="Search"
					onChange={( e ) => setSearchTerm( e.target.value )}
					value={searchTerm}
				/>
			</Form>
		</Fragment>
	);
};

export default withRouter( Search );
