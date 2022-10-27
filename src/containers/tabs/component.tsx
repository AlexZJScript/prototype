import { FC, useState } from 'react';

import { Tab, TabsMobile, TabsMobileProps } from '@alfalab/core-components/tabs/mobile';
import { Typography } from '@alfalab/core-components/typography';
import { QuestionCircleMIcon } from '@alfalab/icons-glyph/QuestionCircleMIcon';
import { Input, InputProps } from '@alfalab/core-components/input';
// @ts-ignore
import styles from './component.module.css';

export type Tab = { id: number | string; title: string; text?: string };

export type TabsProps = Omit<TabsMobileProps, 'onChange' | 'children'> & {
	tabs: Tab[];
	tabsInnerClassName?: string;
	inputClassName?: string;
};

export const Tabs: FC<TabsProps> = ({
	tabs: defaultTabs,
	tabsInnerClassName,
	inputClassName,
	...restProps
}) => {
	const [selectedId, setSelectedId] = useState(defaultTabs[0].id);
	const [inputValue, setInputValue] = useState('');

	const handleChange: TabsMobileProps['onChange'] = (e, { selectedId }) => {
		setSelectedId(selectedId);

		const updatedInputValue = defaultTabs.find((tab) => +tab.id === +selectedId);

		if (!updatedInputValue) return;

		setInputValue(updatedInputValue.text || '');
	};

	const handleInputChange: InputProps['onChange'] = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<div className={tabsInnerClassName}>
			<Typography.Text view='component' className={styles.label}>
				НДС
			</Typography.Text>
			<TabsMobile
				containerClassName={styles.container}
				fullWidthScroll={true}
				selectedId={selectedId}
				view='secondary'
				onChange={handleChange}
				{...restProps}
			>
				{defaultTabs.map(({ id, title }) => (
					<Tab key={id} id={id} title={title}>
						<Input
							className={inputClassName}
							block={true}
							label='Назначение платежа'
							labelView='outer'
							value={inputValue}
							onChange={handleInputChange}
							hint={`${inputValue.length}/240 символов`}
							rightAddons={<QuestionCircleMIcon className={styles.addon} />}
						/>
					</Tab>
				))}
			</TabsMobile>
		</div>
	);
};
