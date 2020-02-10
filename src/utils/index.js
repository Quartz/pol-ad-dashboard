export { default as withURLSearchParams } from './withURLSearchParams';

export const compose = ( ...functions ) => functions.reduce( ( accum, curr ) =>  ( ...args ) => accum( curr( ...args ) ), arg => arg );
