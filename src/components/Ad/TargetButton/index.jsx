import React from 'react';
import { Button } from 'semantic-ui-react';
import classnames from 'classnames/bind';
import styles from './TargetButton.module.css';

const cx = classnames.bind( styles );

const TargetButton = ( { target } ) => (
	<div className={cx( 'container' )}>
		<Button.Group>
			<Button>
				{target.target}
			</Button>
			<Button color="olive">
				{target.segment}
			</Button>
		</Button.Group>
	</div>
);

export default TargetButton;