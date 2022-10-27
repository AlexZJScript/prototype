import { FC, memo, useCallback } from 'react';

import {
	AmountInput as DefaultAmountInput,
	AmountInputProps as DefaultAmountInputProps,
} from '@alfalab/core-components/amount-input';
import { useField } from 'formik';

export type AmountInputProps = DefaultAmountInputProps & {
	name: string;
};

const MemoizedDefaultAmountInput = memo(DefaultAmountInput);

export const AmountInput: FC<AmountInputProps> = ({ name, ...restProps }) => {
	const [field, meta, { setValue }] = useField(name);

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => 
		setValue(e.target.value, false),
	[]);

	return (
		<MemoizedDefaultAmountInput
			size='m'
			block={true}
			name={name}
			onChange={handleChange}
			{...restProps}
		/>
	);
};
