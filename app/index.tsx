import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import { ScrollBox, useWindowResize } from '../lib';

import './index.scss';

function Demo(props) {
	return <div>Demo1</div>;
}

function App(props) {
	useEffect(() => {
		// return () => {
		// 	cleanup
		// };
	}, []);

	const { width, height } = useWindowResize();
	return (
		<ScrollBox
			size={[width, height]}
			withScrollBar={
				true
				// <ScrollBar
				// 	comptStyle={{
				// 		'.slider': {
				// 			'border-radius': '10px'
				// 		}
				// 	}}
				// />
			}
		>
			<div style={{ height: '6000px', width: '5000px', position: 'relative' }}>
				{Array(1000)
					.fill('sadas')
					.join('')}
				<div
					style={{
						position: 'absolute',
						bottom: '0px'
					}}
				>
					<Demo>
						<div>adsada</div>
					</Demo>
					dadas
				</div>
			</div>
		</ScrollBox>
	);
}

/*eslint-env browser*/
ReactDOM.render(<App />, document.getElementById('root'));
