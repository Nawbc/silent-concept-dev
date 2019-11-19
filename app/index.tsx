import ReactDOM from 'react-dom';
import React, { useRef, useEffect } from 'react';
import { ScrollBox, ScrollBar, useWindowResize } from '../lib';

import './index.scss';

class Demo extends React.Component<any> {
	i: any;
	constructor(props) {
		super(props);
		this.i = React.createRef();
	}

	public render() {
		return <div ref={this.i}>sadasdsa</div>;
	}
}

function App(props) {
	const ref = useRef(null);
	useEffect(() => {
		// return () => {
		// 	cleanup
		// };
	}, []);

	const { width, height } = useWindowResize();
	console.log(width, height);
	return (
		<ScrollBox
			size={[width, height]}
			withScrollBar={
				<ScrollBar
					comptStyle={{
						'.slider': {
							'border-radius': '10px'
						}
					}}
				/>
			}
		>
			<div style={{ height: '4000px', width: '5000px', position: 'relative' }}>
				{Array(1000)
					.fill('dadsadas')
					.join('')}
				<div
					style={{
						position: 'absolute',
						bottom: '0px'
					}}
				>
					<Demo ref={ref}>
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
