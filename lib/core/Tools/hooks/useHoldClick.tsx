import { RefObject, useState, useRef, useEffect } from 'react';

export const useHoldClick = function(init = false): [RefObject<any>, boolean] {
	const [hold, setHold] = useState(init);
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const currentEle = ref.current!;
		currentEle.onmousedown = () => {
			setHold(false);
		};

		currentEle.onmouseup = () => {
			setHold(true);
		};
	}, []);

	return [ref, hold];
};
