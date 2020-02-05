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

		componentDidMount() {
			const { location: { search } } = this.props;
			this.setState( { params: new URLSearchParams( search ) } );
		}

		componentDidUpdate( prevProps ) {
			const { location: { search } } = this.props;
			const { location: { search: prevSearch } } = prevProps;
			if ( search !== prevSearch ) {
				this.setState( { params: new URLSearchParams( search ) } );
			}
		}

		getParam = ( param ) => this.state.params.get( param )

		getFormattedParams = () => {
			const { params } = this.state;
			const formattedParams = {};
			const keys = params.keys();
			for ( const key of keys ) {
				formattedParams[key] = params.get( key ).split( ',' );
			}
			return formattedParams;
		}

		toggleParam = ( param ) => {
			const { params } = this.state;
			const existingParam = params.get( param );
			if ( !existingParam ) {
				params.set( param, true );
			} else {
				params.delete( param );
			}
			params.delete( 'page' );
			// history.push( { pathname, search: params.toString() } );
			this.pushParams( params );
		}

		setParam = ( param, value ) => {
			const { params } = this.state;
			if ( !value ) {
				params.delete( param );
			} else {
				params.set( param, value );
			}
			// if we're changing anything but page, go back to page 1
			if ( param !== 'page' ) {
				params.delete( 'page' );
			}
			// history.push( { pathname, search: params.toString() } );
			this.pushParams( params );
		}

		pushParams = ( params ) => {
			const { history, location: { pathname } } = this.props;
			this.setState( { params: new URLSearchParams( params ) }, () => history.push( { pathname, search: params.toString() } ) )
		}

		render() {
			const funcs = {
				getFormattedParams: this.getFormattedParams,
				getParam: this.getParam,
				setParam: this.setParam,
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
