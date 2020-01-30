import React, { useState, Fragment } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const Search = ( { history } ) => {
	const [ searchTerm, setSearchTerm ] = useState( '' );

	const onSubmit = () => {
		console.log( searchTerm );
		history.push( { pathname: '/search', search: `?search=${encodeURI( searchTerm )}` } );
	};

	return (
		<Fragment>
			<Form onSubmit={onSubmit}>
				<Input
					icon="search"
					placeholder="Search"
					onChange={( e ) => setSearchTerm( e.target.value )}
				/>
			</Form>
		</Fragment>
	);
};

export default withRouter( Search );
