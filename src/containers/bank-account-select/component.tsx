import React, { FC, memo, useState } from "react";

import { SelectMobile, SelectMobileProps } from "@alfalab/core-components/select";
import { Typography } from "@alfalab/core-components/typography";
import { CrossMIcon } from "@alfalab/icons-glyph/CrossMIcon";

// @ts-ignore
import styles from "./component.module.css";
import { RubIcon } from "../../icons";

const options = [
	{
		key: "1",
		content: (
			<div className={styles.option}>
				<RubIcon />
				<div className={styles.optionContent}>
					<Typography.Text view="primary-medium" tag="div">
						1 950 567,45 ₽
					</Typography.Text>
					<Typography.Text
						view="primary-medium"
						tag="div"
						className={styles.optionSubTitle}
					>
						Рублёвый счёт ··6781
					</Typography.Text>
				</div>
			</div>
		),
	},
];

const DefaultBankAccountSelect: FC<{ className?: string }> = ({
	className,
}) => {
	const [open, setOpen] = useState(false);

	const renderValue = () => (
		<React.Fragment>
			<Typography.Text view="component">1 950 567,45 ₽</Typography.Text>
			<Typography.Text view="component" style={{ opacity: 0.6 }}>
				&nbsp;··6781
			</Typography.Text>
		</React.Fragment>
	);

	const handleOpen: SelectMobileProps["onOpen"] = ({ open }) => {
		if (open === undefined) return;

		setOpen(open);
	};

	const handleClick = () => setOpen(false);

	return (
		<SelectMobile
			optionsListClassName={styles.optionsList}
			selected={options[0].key}
			open={open}
			className={className}
			label="Счёт списания"
			labelView="outer"
			options={options}
			onOpen={handleOpen}
			block={true}
			valueRenderer={renderValue}
			bottomSheetProps={{
				swipeable: false,
				title: (
					<Typography.Text view="component" weight="medium">
						Счёт списания
					</Typography.Text>
				),
				hasCloser: false,
				rightAddons: <CrossMIcon onClick={handleClick} />,
				headerClassName: styles.header,
			}}
			fieldProps={{
				addonsClassName: styles.addons,
				leftAddons: <RubIcon />,
				focused: false,
			}}
		/>
	);
};

export const BankAccountSelect = memo(DefaultBankAccountSelect);
