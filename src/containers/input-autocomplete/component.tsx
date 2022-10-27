import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { useFormikContext, useField } from 'formik';
import cn from 'classnames';

import { InputAutocompleteMobile as DefaultInputAutocompleteMobile, InputAutocompleteMobileProps } from '@alfalab/core-components/input-autocomplete/mobile';
import { Typography } from '@alfalab/core-components/typography';
import { MaskedInput } from '@alfalab/core-components/masked-input';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';
// @ts-ignore
import styles from './component.module.css';
import { BaseSelectChangePayload } from '@alfalab/core-components/select';

const MemoizedInputAutocompleteMobile = memo(DefaultInputAutocompleteMobile);

export type Option = {
	id: number;
	title: string;
	subTitle: string;
	description?: string;
};

export type InputAutocomplete = Omit<InputAutocompleteMobileProps, 'name' | 'onChange' | 'onFilter' | 'options'> & {
	name: string;
	options: Option[];

	/**
	 * Какое значение из опции взять в качестве value при выборе
	 */
	valueToFill: keyof Option;

	/**
	 * Заполнить другие инпуты значениями из опции
	 */
	valuesToFill?: { [key: string]: keyof Option };

	/**
	 * Заголовок шторки
	 */
	headerTitle: string;

	/**
	 * Маска для инпута
	 */
	mask?: Array<string | RegExp>;
};

export const InputAutocomplete: FC<InputAutocomplete> = ({ name, mask, options, headerTitle, valueToFill, valuesToFill, ...restProps }) => {
	const { setValues, values } = useFormikContext();
	const [{ value }, meta, { setValue }] = useField(name);
	const [filter, setFilter] = useState('');
	const [open, setOpen] = useState(false);

	const transformedOptions = useMemo(() => {
		const filteredOptions = filter
			? options.filter(
					({ subTitle, title }) =>
						title.toLowerCase().includes(filter.toLowerCase()) || subTitle.toLowerCase().includes(filter.toLowerCase())
			  )
			: [];

		return filteredOptions.map(({ subTitle, title, id, description }) => ({
			key: id.toString(),
			content: (
				<React.Fragment>
					<Typography.Text tag='div'>{title}</Typography.Text>
					<Typography.Text tag='div' className={cn(styles.subTitle)}>
						{subTitle}
					</Typography.Text>
					{description && (
						<Typography.Text className={cn(styles.subTitle)} tag='div' view='primary-small'>
							{description}
						</Typography.Text>
					)}
				</React.Fragment>
			),
		}));
	}, [filter]);

	const handleChangeFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value), [])

	const handleClearFilter = useCallback(() => setFilter(''), []);

	const handleChange = useCallback((payload: string | BaseSelectChangePayload) => {
		console.log('dsd')
		if (typeof payload === 'string' || payload.selected === null) return;

		const { key } = payload.selected;

		const option = options.find((option) => option.id === +key);

		if (!option) return;

		if (!valuesToFill) {
			setValue(option[valueToFill], false);
			return;
		}

		const updatedValues = Object.keys(valuesToFill).reduce((acc, item) => {
			return { ...acc, [item]: option[valuesToFill[item]] };
		}, {});

		setValues({ ...(values as Object), ...updatedValues, [name]: option[valueToFill] }, false);
	}, [options, valuesToFill, valueToFill])

	const handleOpen = useCallback(({ open }: { open?: boolean; }) => {
		setOpen(!!open);
	}, [])

	const bottomSheetProps: InputAutocompleteMobileProps['bottomSheetProps'] = useMemo(() => {
		const handleClose = () => {
			setOpen(false);
		};
		
		return ({
			title: (
				<Typography.Text view='component' weight='medium'>
					{headerTitle}
				</Typography.Text>
			),
			titleAlign: 'center',
			swipeable: false,
			headerClassName: styles.bottomSheetHeader,
			hasCloser: false,
			rightAddons: <CrossMIcon onClick={handleClose} />,
			actionButton: null,
		})
	}, [headerTitle])

	const { filterInputProps, Input } = useMemo(() => ({
		filterInputProps: {
			placeholder: '',
			size: 'm',
			...(mask ? { mask } : {}),
		},
		...(mask ? { Input: MaskedInput } : {})
	}), [mask])

	return (
		<MemoizedInputAutocompleteMobile
			Input={Input}
			block={true}
			open={open}
			onOpen={handleOpen}
			onFilter={handleChangeFilter}
			optionClassName={cn(styles.option)}
			onChange={handleChange}
			value={value}
			filter={filter}
			options={transformedOptions}
			onClearFilter={handleClearFilter}
			size='m'
			bottomSheetHeaderAddonsProps={filterInputProps}
			bottomSheetProps={bottomSheetProps}
			{...restProps}
		/>
	);
};