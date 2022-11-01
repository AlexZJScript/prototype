import { FC, useMemo, useState } from "react";

import { CrossMIcon } from "@alfalab/icons-glyph/CrossMIcon";
import { SelectMobile, SelectMobileProps } from "@alfalab/core-components/select";
import { Radio } from "@alfalab/core-components/radio";
import { Typography } from "@alfalab/core-components/typography";
// @ts-ignore
import styles from "./component.module.css";
import { Option } from "./option/component";

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

	const options: SelectMobileProps['options'] = useMemo(() => {
		return defaultOptions.map(({ id, label, hint }) => ({
			key: id.toString(),
			content: <Radio checked={selected === id} size='m' label={label} hint={hint} />,
		}));
	}, [defaultOptions, selected]);

	const handleOpen: SelectPops['onOpen'] = ({ open }) => {
		if (open === undefined) return;

		setOpen(open);
	};

	const handleClick = () => {
		setOpen(false);
	};

	const handleChange: SelectMobileProps['onChange'] = ({ selected: updatedSelected }) => {
		if (!updatedSelected) return;

        setSelected(+updatedSelected.key);
	};

	const renderValue: SelectMobileProps['valueRenderer'] = () => {
		const updatedValue = defaultOptions.find(({ id }) => id === selected);

		if (!updatedValue) return;

		return updatedValue[pickValue];
	};

	return (
		<SelectMobile
			onChange={handleChange}
			selected={selected.toString()}
			onOpen={handleOpen}
			open={open}
			block={true}
			Option={Option}
			optionClassName={styles.option}
			optionsListClassName={styles.optionList}
			valueRenderer={renderValue}
			fieldProps={{
				focused: false,
			}}
			bottomSheetProps={{
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
