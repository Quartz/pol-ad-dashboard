import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const withURLSearchParams = WrappedComponent => {
	class ComponentWithURLSearchParams extends Component {
		constructor( props ) {
			super( props );
			const { location: { search } } = props;
			this.state = {
				params: new URLSearchParams( search ),
			};
		}

		toggleParam = ( param ) => {
			const { history, location: { pathname } } = this.props;
			const { params } = this.state;
			const existingParam = params.get( param );
			if ( !existingParam ) {
				params.set( param, true );
			} else {
				params.delete( param );
			}
			history.push( { pathname, search: params.toString() } );
		}

		setParam = ( param, value ) => {
			const { history, location: { pathname } } = this.props;
			const { params } = this.state;
			if ( !value ) {
				params.delete( param );
			} else {
				params.set( param, value );
			}
			history.push( { pathname, search: params.toString() } );
		}

		render() {
			const funcs = {
				toggleParam: this.toggleParam,
			};
			return (
				<WrappedComponent
					{...this.props}
					{...funcs}
				/>
			);
		}
	}

	return withRouter( ComponentWithURLSearchParams );
};

export default withURLSearchParams;
