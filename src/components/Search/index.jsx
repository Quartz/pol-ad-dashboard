import React, { useState, Fragment } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const Search = ( { history } ) => {
	const [ searchTerm, setSearchTerm ] = useState( '' );

	const onSubmit = () => {
		const search = searchTerm === '' ? '' : `?search=${encodeURI( searchTerm )}`;
		history.push( { pathname: '/search', search } );
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
