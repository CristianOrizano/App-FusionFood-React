import { MutableRefObject, forwardRef, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';

interface IndeterminateCheckProps {
	indeterminate: boolean;
	className?: string;
}

const IndeterminateCheck = forwardRef<HTMLInputElement, IndeterminateCheckProps>(
	({ indeterminate, className, ...rest }, ref) => {
		const defaultRef = useRef<HTMLInputElement>();
		const resolvedRef = (ref ?? defaultRef) as MutableRefObject<HTMLInputElement>;

		useEffect(() => {
			if (typeof indeterminate === 'boolean' && resolvedRef != null)
				resolvedRef.current.indeterminate = indeterminate;
		}, [resolvedRef, indeterminate]);

		return <Form.Check type="checkbox" className={className} ref={resolvedRef} {...rest} />;
	},
);

IndeterminateCheck.displayName = 'IndeterminateCheck';

export default IndeterminateCheck;
