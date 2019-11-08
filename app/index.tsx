import ReactDOM from 'react-dom';
// import { ScrollBox, Occupy, ScrollBar } from '../lib';
import { comptStyle } from 'component-style';
import React from 'react';
import './index.scss';

function Demo(props: any) {
	comptStyle('#demo', props.comptStyle);

	return (
		<div id="demo">
			<div className="a">
				<div className="aa">
					component
					<div className="ab" />
				</div>
				<div className="b" />
				<div className="c" />
				<div className="d">
					<div className="da" />
				</div>
			</div>
		</div>
	);
}

function App() {
	return (
		<div>
			<Demo
				comptStyle={{
					'.a': {
						width: '500px',
						height: '500px',
						background: 'red',
						'.aa': {
							'font-size': '20px'
						},
						'.ab': {
							width: '50px',
							height: '50px',
							background: 'yellow'
						}
					},
					'.b': {
						width: '200px',
						height: '200px',
						background: 'blue'
					},
					'.c': {
						width: '40px',
						height: '40px',
						background: 'green'
					},
					'.d': {
						width: '10px',
						height: '10px',
						background: 'pink',
						'.da': {
							width: '10px',
							height: '10px',
							border: '1px solid #000'
						}
					}
				}}
			/>
		</div>
	);
}

/*eslint-env browser*/
ReactDOM.render(<App />, document.getElementById('root'));
