import { Formik, Form as FormikForm } from 'formik';
import { FC } from 'react';

import { QuestionCircleMIcon } from '@alfalab/icons-glyph/QuestionCircleMIcon';
import { Typography } from '@alfalab/core-components/typography';
import { CalendarInput } from '@alfalab/core-components/calendar-input';
import { Textarea } from '@alfalab/core-components/textarea';
import { Link } from '@alfalab/core-components/link';
import { Button } from '@alfalab/core-components/button';
import { PickerButton } from '@alfalab/core-components/picker-button';

import { InputAutocomplete } from '../input-autocomplete';
// @ts-ignore
import styles from './component.module.css';
import { AmountInput } from '../amount-input';
import { RubIcon } from '../../icons';
import { Tabs } from '../tabs';
import { Input } from '../input';
import { Select } from '../select';
import { Switch } from '../switch';
import { orderOptions, recipient, recipientBankNumbers, recipientBanks, tabs, urgencyOptions } from './mocks';
import { recipientBankNumberMask } from './masks';

const initialValues = {
	contragent: '',
	inn: '',
	kpp: '',
	bik: '',
	bankAcount: '',
	sendersAccount: '12323131',
	amount: '',
	paymentTarget: '',
	documentNumber: '',
	uun: '',
	comisionMessage: 'Заполните реквизиты, и мы рассчитаем комиссию',
};

const defaultCalendarValue = `${new Date().getDate()}.${
	new Date().getMonth() + 1
}.${new Date().getFullYear()}`;

const defaultCalendarProps: Record<string, unknown> = {
	selectorView: 'month-only',
};

const contragentValuesToFill = {
    inn: 'subTitle',
    kpp: 'subTitle',
}

export type FormProps = {
    onSubmit: () => void;
}

export const Form: FC<FormProps> = ({ onSubmit }) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({ values }) => (
				<FormikForm>
					<InputAutocomplete
						className={styles.field}
						labelView='outer'
						label='Наименование'
						options={recipient}
						name='contragent'
						valueToFill='title'
						headerTitle='Наименование и ИНН'
						valuesToFill={contragentValuesToFill as {}}
					/>
					<InputAutocomplete
						valueToFill='subTitle'
						className={styles.field}
						labelView='outer'
						label='ИНН'
						headerTitle='Наименование и ИНН'
						placeholder='0000000000'
						options={recipient}
						name='inn'
					/>
					<InputAutocomplete
						valueToFill='subTitle'
						className={styles.field}
						labelView='outer'
						label='КПП'
						headerTitle='Наименование и ИНН'
						options={recipient}
						name='kpp'
						placeholder='0000000000'
					/>
					<InputAutocomplete
						valueToFill='title'
						className={styles.field}
						labelView='outer'
						label='БИК или название банка'
						headerTitle='БИК или название банка'
						options={recipientBanks}
						placeholder='0000000000'
						name='bik'
					/>
					<InputAutocomplete
						valueToFill='title'
						className={styles.field}
						labelView='outer'
						label='Счет получателя'
						headerTitle='Счет получателя'
						options={recipientBankNumbers}
						mask={recipientBankNumberMask}
						placeholder='00000 000 0 0000 0000000'
						name='bankAcount'
					/>
					<Typography.TitleMobile
						className={styles.section}
						tag='div'
						view='small'
						font='system'
					>
						Сумма и назначение
					</Typography.TitleMobile>
					<AmountInput
						name='sendersAccount'
						bold={false}
						leftAddons={<RubIcon />}
						label='Счёт списания'
						labelView='outer'
						value='195056745'
						className={styles.field}
						disabled={true}
						currency='RUR'
						suffix='₽ ··6781'
					/>
					<AmountInput
						name='amount'
						bold={false}
						label='Сумма'
						labelView='outer'
						className={styles.field}
						minority={100}
					/>
					<Tabs
						tabs={tabs}
						tabsInnerClassName={styles.tabsField}
						inputClassName={styles.field}
					/>
					<Typography.TitleMobile
						className={styles.section}
						tag='div'
						view='small'
						font='system'
					>
						Настройки отправки
					</Typography.TitleMobile>
					<Input
						name='documentNumber'
						label='Номер доокумента'
						type='text'
						inputMode='numeric'
						labelView='outer'
						className={styles.field}
					/>
					<Input
						name='uun'
						label='УИН/УИП'
						placeholder='0'
						type='text'
						inputMode='numeric'
						labelView='outer'
						className={styles.field}
					/>
					<CalendarInput
						label='Дата в документе'
						labelView='outer'
						block={true}
						size='m'
						className={styles.field}
						defaultValue={defaultCalendarValue}
						calendarProps={defaultCalendarProps}
					/>
					<CalendarInput
						label='Отправить не ранее'
						labelView='outer'
						block={true}
						size='m'
						className={styles.field}
						defaultValue={defaultCalendarValue}
						calendarProps={defaultCalendarProps}
					/>
					<Select
						label='Срочность'
						title='Выберите срочность'
						labelView='outer'
						options={urgencyOptions}
						className={styles.field}
						pickValue='label'
					/>
					<Select
						label='Очередность'
						labelView='outer'
						options={orderOptions}
						className={styles.field}
						title='Выберите очередность'
						pickValue='id'
					/>
					<div className={styles.switchContainer}>
						<Switch label='Уведомить об исполнении платежа' />
					</div>
					<div className={styles.switchContainer}>
						<Switch label='Отправить платёж после подписания в банк' />
					</div>

					<Textarea
						block={true}
						className={styles.field}
						value={
							values.amount
								? 'Комиссия 150,00 ₽\nРассчитано для суммы 5 750,00 ₽'
								: 'Заполните реквизиты, и мы рассчитаем комиссию'
						}
						rightAddons={<QuestionCircleMIcon className={styles.addon} />}
						fieldClassName={styles.textAreaField}
					/>
					<div className={styles.formDescription}>
						<Typography.Text
							className={styles.formDescriptionText}
							view='primary-medium'
						>
							{'С 1:00 до 21:00 мск отправляем платежи в другие банки. '}
						</Typography.Text>
						<Link view='default'>Подробнее</Link>
					</div>
					<div className={styles.formAction}>
						<Button block={true} type='submit' view='primary'>
							Подписать
						</Button>
						<PickerButton options={[]} variant='compact' size='m' />
					</div>
				</FormikForm>
			)}
		</Formik>
	);
};
