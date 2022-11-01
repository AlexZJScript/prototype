import { FC, Fragment, useState } from "react";

import { CalendarMobile, CalendarMobileProps } from "@alfalab/core-components/calendar";
import { FormControl, FormControlProps } from "@alfalab/core-components/form-control";
import { formatDate } from "@alfalab/core-components/date-input";

const initValue = () => +new Date();

export const CalendarInput: FC<FormControlProps> = ({ ...restProps }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(initValue);

	const handleChange: CalendarMobileProps["onChange"] = (value) => {
		if (value === undefined) return;

		setValue(value);
	};

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	return (
		<Fragment>
			<FormControl
				block={true}
				labelView="outer"
				onClick={handleOpen}
				size="m"
				{ ...restProps }
			>
				<div>{formatDate(value)}</div>
			</FormControl>
			<CalendarMobile
				open={open}
				onClose={handleClose}
				selectorView="month-only"
				onChange={handleChange}
				value={value}
			/>
		</Fragment>
	);
};
