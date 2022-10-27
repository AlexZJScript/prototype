import { FC, useMemo, useState } from 'react';

import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';
import { SelectMobile, SelectMobileProps } from '@alfalab/core-components/select';
import { Button } from '@alfalab/core-components/button';
import { Radio } from '@alfalab/core-components/radio';
import { Typography } from '@alfalab/core-components/typography';
// @ts-ignore
import styles from './component.module.css';
import { Option } from './option/component';

export type Option = {
	id: string | number;
	label: string;
	hint?: string;
};

export type SelectPops = Omit<SelectMobileProps, 'options'> & {
	options: Option[];
	title: string;
	pickValue: keyof Option;
};

export const Select: FC<SelectPops> = ({
	name,
	options: defaultOptions,
	title,
	pickValue,
	...restProps
}) => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(defaultOptions[0].id || 0);
	const [newSelected, setNewSelected] = useState(selected);

	const options: SelectMobileProps['options'] = useMemo(() => {
		return defaultOptions.map(({ id, label, hint }) => ({
			key: id.toString(),
			content: <Radio checked={newSelected === id} label={label} hint={hint} />,
		}));
	}, [defaultOptions, newSelected]);

	const handleOpen: SelectPops['onOpen'] = ({ open }) => {
		if (open === undefined) return;

		setOpen(open);
	};

	const handleClick = () => {
		setOpen(false);
	};

	const handleChange: SelectMobileProps['onChange'] = ({ selected: updatedSelected }) => {
		if (!updatedSelected) return;

        setNewSelected(+updatedSelected.key);
	};

    const handleActionClick = () => {
        setSelected(newSelected);
        setOpen(false)
    }

	const renderValue: SelectMobileProps['valueRenderer'] = () => {
		const updatedValue = defaultOptions.find(({ id }) => id === selected);

		if (!updatedValue) return;

		return updatedValue[pickValue];
	};

	return (
		<SelectMobile
			onChange={handleChange}
			closeOnSelect={false}
			selected={newSelected.toString()}
			onOpen={handleOpen}
			open={open}
			block={true}
			Option={Option}
			optionClassName={styles.option}
			optionsListClassName={styles.optionList}
			valueRenderer={renderValue}
			bottomSheetProps={{
				footerClassName: styles.footer,
				actionButton: (
					<Button
						size='m'
						block={true}
						onClick={handleActionClick}
						view={newSelected === selected ? undefined : 'primary'}
					>
						{newSelected === selected ? 'Отмена' : 'Готово'}
					</Button>
				),
				hasCloser: false,
				rightAddons: <CrossMIcon onClick={handleClick} />,
				swipeable: false,
				title: (
					<Typography.Text view='component' weight='medium'>
						{title}
					</Typography.Text>
				),
				titleAlign: 'center',
				headerClassName: styles.header,
			}}
			options={options}
			{...restProps}
		/>
	);
};
