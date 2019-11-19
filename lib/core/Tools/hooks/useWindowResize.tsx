import { useState, useLayoutEffect } from 'react';

export const useWindowResize = function() {
	const getSize = () => ({ width: window.innerWidth, height: window.innerHeight });
	const [size, setReSize] = useState(getSize());
	useLayoutEffect(() => {
		window.onresize = () => setReSize(getSize());
		// return () => {

		// }
	}, []);
	return size;
};
