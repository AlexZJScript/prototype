import { Form as FormikForm, Formik } from "formik";
import { FC } from "react";
import cn from "classnames";

import { QuestionCircleMIcon } from "@alfalab/icons-glyph/QuestionCircleMIcon";
import { Typography } from "@alfalab/core-components/typography";
import { CalendarInput } from "@alfalab/core-components/calendar-input";
import { Link } from "@alfalab/core-components/link";
import { Button } from "@alfalab/core-components/button";
import { PickerButton } from "@alfalab/core-components/picker-button";

import { InputAutocomplete } from "../input-autocomplete";
// @ts-ignore
import styles from "./component.module.css";
import { AmountInput } from "../amount-input";
import { Tabs } from "../tabs";
import { Input } from "../input";
import { Select } from "../select";
import { Switch } from "../switch";
import {
	orderOptions,
	PickerButtonOptions,
	recipient,
	recipientBankNumbers,
	recipientBanks,
	tabs,
	urgencyOptions,
} from "./mocks";
import { recipientBankNumberMask } from "./masks";
import { BankAccountSelect } from "../bank-account-select";

const initialValues = {
	contragent: "",
	inn: "",
	kpp: "",
	bik: "",
	bankAcount: "",
	sendersAccount: "12323131",
	amount: "",
	paymentTarget: "",
	documentNumber: "",
	uun: "",
	comisionMessage: "Заполните реквизиты, и мы рассчитаем комиссию",
};

const defaultCalendarValue = `${new Date().getDate()}.${
	new Date().getMonth() + 1
}.${new Date().getFullYear()}`;

const defaultCalendarProps: Record<string, unknown> = {
	selectorView: "month-only",
};

const contragentValuesToFill = {
	inn: "subTitle",
	kpp: { value: "770201001" },
};

const kppValueToFill = {
	value: "770201001",
};

const recipientNameOrInnFilterProps = {
	placeholder: "Наименование или ИНН",
};

const recipientBankNameOrBikFilterProps = {
	placeholder: "БИК или название банка",
};

const recipientBankNumbersFilterInputProps = {
	type: "text",
	inputMode: "numeric",
	placeholder: "00000 000 0 0000 0000000",
};

const pickerButtonBottomSheetProps = {
	title: "Другие действия",
};

export type FormProps = {
	onSubmit: () => void;
};

export const Form: FC<FormProps> = ({ onSubmit }) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({ values }) => (
				<FormikForm className={styles.form}>
					<InputAutocomplete
						className={styles.field}
						labelView="outer"
						label="Наименование"
						options={recipient}
						name="contragent"
						valueToFill="title"
						headerTitle="Наименование и ИНН"
						bottomSheetHeaderAddonsProps={
							recipientNameOrInnFilterProps
						}
						valuesToFill={contragentValuesToFill as {}}
					/>
					<InputAutocomplete
						valueToFill="subTitle"
						className={styles.field}
						labelView="outer"
						label="ИНН"
						headerTitle="Наименование и ИНН"
						placeholder="0000000000"
						options={recipient}
						bottomSheetHeaderAddonsProps={
							recipientNameOrInnFilterProps
						}
						name="inn"
					/>
					<InputAutocomplete
						valueToFill={kppValueToFill}
						className={styles.field}
						labelView="outer"
						label="КПП"
						headerTitle="Наименование и ИНН"
						options={recipient}
						name="kpp"
						bottomSheetHeaderAddonsProps={
							recipientNameOrInnFilterProps
						}
						placeholder="000000000"
					/>
					<InputAutocomplete
						valueToFill="title"
						className={styles.field}
						labelView="outer"
						label="БИК или название банка"
						headerTitle="БИК или название банка"
						bottomSheetHeaderAddonsProps={
							recipientBankNameOrBikFilterProps
						}
						options={recipientBanks}
						placeholder="000000000"
						name="bik"
					/>
					<InputAutocomplete
						valueToFill="title"
						className={styles.field}
						labelView="outer"
						label="Счёт получателя"
						headerTitle="Счёт получателя"
						options={recipientBankNumbers}
						bottomSheetHeaderAddonsProps={
							recipientBankNumbersFilterInputProps
						}
						mask={recipientBankNumberMask}
						placeholder="00000 000 0 0000 0000000"
						name="bankAcount"
					/>
					<Typography.TitleMobile
						className={styles.section}
						tag="div"
						view="small"
						font="system"
					>
						Сумма и назначение
					</Typography.TitleMobile>
					<BankAccountSelect className={styles.field} />
					<AmountInput
						name="amount"
						bold={false}
						label="Сумма"
						labelView="outer"
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
						tag="div"
						view="small"
						font="system"
					>
						Настройки отправки
					</Typography.TitleMobile>
					<Input
						name="documentNumber"
						label="Номер доокумента"
						type="text"
						inputMode="numeric"
						labelView="outer"
						className={styles.field}
					/>
					<Input
						name="uun"
						label="УИН/УИП"
						placeholder="0"
						type="text"
						inputMode="numeric"
						labelView="outer"
						className={styles.field}
					/>
					<CalendarInput
						label="Дата в документе"
						labelView="outer"
						block={true}
						size="m"
						className={styles.field}
						defaultValue={defaultCalendarValue}
						calendarProps={defaultCalendarProps}
					/>
					<CalendarInput
						label="Отправить не ранее"
						labelView="outer"
						block={true}
						size="m"
						className={styles.field}
						defaultValue={defaultCalendarValue}
						calendarProps={defaultCalendarProps}
					/>
					<Select
						label="Срочность"
						title="Выберите срочность"
						labelView="outer"
						options={urgencyOptions}
						className={styles.field}
						pickValue="label"
					/>
					<Select
						label="Очередность"
						labelView="outer"
						options={orderOptions}
						className={styles.field}
						title="Выберите очередность"
						pickValue="id"
					/>
					<div className={styles.switchContainer}>
						<Switch label="Уведомить об исполнении платежа" />
					</div>
					<div className={styles.switchContainer}>
						<Switch
							defaultChecked={true}
							label="Отправить платёж после подписания в банк"
						/>
					</div>
					<div
						className={cn(
							styles.commissionContainer,
							styles.commissionField,
						)}
					>
						<div>
							<Typography.Text
								className={styles.commissionText}
								view="primary-medium"
							>
								{values.amount
									? "Комиссия 150,00 ₽\n Рассчитано для суммы 5 750,00 ₽"
									: "Заполните реквизиты,\n и мы рассчитаем комиссию"}
							</Typography.Text>
						</div>
						<div>
							<QuestionCircleMIcon className={styles.addon} />
						</div>
					</div>
					<div className={styles.formDescription}>
						<Typography.Text
							className={styles.formDescriptionText}
							view="primary-medium"
						>
							{
								"С 1:00 до 21:00 мск отправляем платежи в другие банки. "
							}
						</Typography.Text>
						<Link view="default">Подробнее</Link>
					</div>
					<div className={styles.formAction}>
						<Button block={true} type="submit" view="primary">
							Подписать
						</Button>
						<PickerButton
							optionsListClassName={styles.optionsList}
							bottomSheetProps={pickerButtonBottomSheetProps}
							options={PickerButtonOptions}
							variant="compact"
							size="m"
						/>
					</div>
				</FormikForm>
			)}
		</Formik>
	);
};
