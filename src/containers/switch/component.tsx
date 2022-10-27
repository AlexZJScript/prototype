import { FC, memo, useState } from 'react';

import { Switch as DefaultSwitch, SwitchProps } from '@alfalab/core-components/switch';

export const UnMemoSwitch: FC<SwitchProps> = ({ className, ...props }) => {
	const [checked, setChecked] = useState(false);

	const handleChange = () => setChecked((prev) => !prev);

	return (
		<DefaultSwitch
			block={true}
			checked={checked}
			onChange={handleChange}
			reversed={true}
			{...props}
		/>
	);
};

export const Switch = memo(UnMemoSwitch);
