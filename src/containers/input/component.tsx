import { FC, memo } from 'react';
import { useField } from 'formik';

import { Input as DefaultInput, InputProps as DefaultInputProps } from '@alfalab/core-components/input';
import { QuestionCircleMIcon } from '@alfalab/icons-glyph/QuestionCircleMIcon'

// @ts-ignore
import styles from './component.module.css';

const MemoizedDefaultInput = memo(DefaultInput)

export type InputProps = Omit<DefaultInputProps, 'name'> & {
	name: string;
};

export const Input: FC<InputProps> = ({ name, ...restProps }) => {
	const [field] = useField(name);

	return (
		<MemoizedDefaultInput
			block={true}
			size='m'
			rightAddons={<QuestionCircleMIcon className={styles.addon} />}
			{...field}
			{...restProps}
		/>
	);
};
