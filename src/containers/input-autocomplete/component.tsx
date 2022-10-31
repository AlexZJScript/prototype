import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import {useFormikContext, useField} from 'formik';
import cn from 'classnames';

import {
    InputAutocompleteMobile as DefaultInputAutocompleteMobile,
    InputAutocompleteMobileProps as DefaultInputAutocompleteMobileProps
} from '@alfalab/core-components/input-autocomplete/mobile';
import {Typography} from '@alfalab/core-components/typography';
import {MaskedInput} from '@alfalab/core-components/masked-input';
import {CrossMIcon} from '@alfalab/icons-glyph/CrossMIcon';
import {BaseSelectChangePayload} from '@alfalab/core-components/select';
// @ts-ignore
import styles from './component.module.css';

const MemoizedInputAutocompleteMobile = memo(DefaultInputAutocompleteMobile);

export type Option = {
    id: number;
    title: string;
    subTitle: string;
    description?: string;
};

export type InputAutocompleteProps =
    Omit<DefaultInputAutocompleteMobileProps, 'name' | 'onChange' | 'onFilter' | 'options'>
    & {
    name: string;
    options: Option[];

    /**
     * Какое значение из опции взять в качестве value при выборе
     */
    valueToFill: keyof Option | { value: string };

    /**
     * Заполнить другие инпуты значениями из опции
     */
    valuesToFill?: { [key: string]: InputAutocompleteProps['valueToFill'] };

    /**
     * Заголовок шторки
     */
    headerTitle: string;

    /**
     * Маска для инпута
     */
    mask?: Array<string | RegExp>;
};

export const InputAutocomplete: FC<InputAutocompleteProps> = ({
                                                                  name,
                                                                  mask,
                                                                  bottomSheetHeaderAddonsProps,
                                                                  options,
                                                                  headerTitle,
                                                                  valueToFill,
                                                                  valuesToFill,
                                                                  ...restProps
                                                              }) => {
    const {setValues, values} = useFormikContext();
    const [{value}, meta, {setValue}] = useField(name);
    const [filter, setFilter] = useState('');
    const [open, setOpen] = useState(false);

    const transformedOptions = useMemo(() => {
        const filteredOptions = filter
            ? options.filter(
                ({subTitle, title}) =>
                    title.toLowerCase().includes(filter.toLowerCase()) || subTitle.toLowerCase().includes(filter.toLowerCase())
            )
            : [];

        return filteredOptions.map(({subTitle, title, id, description}) => ({
            key: id.toString(),
            content: (
                <React.Fragment>
                    <Typography.Text tag='div'>{title}</Typography.Text>
                    <Typography.Text tag='div' className={styles.subTitle}>
                        {subTitle}
                    </Typography.Text>
                    {description && (
                        <Typography.Text className={styles.subTitle} tag='div' view='primary-small'>
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
        if (typeof payload === 'string' || payload.selected === null) return;

        const {key} = payload.selected;

        const option = options.find((option) => option.id === +key);

        if (!option) return;

        if (!valuesToFill) {
            setValue(typeof valueToFill === 'string' ? option[valueToFill] : valueToFill.value, false);
            return;
        }

        const updatedValues = Object.keys(valuesToFill).reduce((acc, item) => {
            const value = valuesToFill[item];
            return typeof value === "string" ? (
                {...acc, [item]: option[value]}
            ) : (
                {...acc, [item]: value.value}
            )
        }, {});

        setValues({
            ...(values as Object), ...updatedValues,
            [name]: typeof valueToFill === 'string' ? option[valueToFill] : valueToFill.value
        }, false);
    }, [options, valuesToFill, valueToFill])

    const handleOpen = useCallback(({open}: { open?: boolean; }) => {
        setOpen(!!open);
    }, [])

    const bottomSheetProps: InputAutocompleteProps['bottomSheetProps'] = useMemo(() => {
        const handleClose = () => {
            setOpen(false);
        };

        return ({
            title: (
                <React.Fragment>
                    <Typography.Text view='component' weight='medium'>
                        {headerTitle}
                    </Typography.Text>
                </React.Fragment>
            ),
            titleAlign: 'center',
            swipeable: false,
            headerClassName: styles.bottomSheetHeader,
            hasCloser: false,
            rightAddons: <CrossMIcon onClick={handleClose}/>,
            actionButton: null,
        })
    }, [headerTitle])

    const {filterInputProps, Input} = useMemo(() => ({
        filterInputProps: {
            placeholder: '',
            size: 'm',
            ...(mask ? {mask} : {}),
            ...bottomSheetHeaderAddonsProps,
        },
        ...(mask ? {Input: MaskedInput} : {})
    }), [mask, bottomSheetHeaderAddonsProps])

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