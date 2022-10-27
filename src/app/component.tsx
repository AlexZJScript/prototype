import React, { FC, useState } from 'react';

import { ChevronLeftMIcon } from '@alfalab/icons-ios/ChevronLeftMIcon';
import { CameraMIcon } from '@alfalab/icons-glyph/CameraMIcon';
import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';
// @ts-ignore
import styles from './component.module.css';
import { SuccessModal } from '../containers/success-modal';
import { Form } from '../containers/form';

export const App: FC = () => {
	const [open, setOpen] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSuccess(false);
	};

	const handleInputFinished = () => setSuccess(true);

	return (
		<React.Fragment>
			<SuccessModal
				onClose={handleClose}
				open={open}
				onInputFinished={handleInputFinished}
				success={success}
			/>
			<div className={styles.navBar}>
				<ChevronLeftMIcon />
				<Typography.Text view='component' weight='medium'>
					Платёж юрлицу
				</Typography.Text>
				<CameraMIcon />
			</div>
			<div className={styles.header}>
				<Typography.TitleMobile
					className={styles.recipient}
					tag='div'
					view='small'
					font='system'
				>
					Получатель
				</Typography.TitleMobile>
				<Button view='ghost'>
					<Typography.Text view='primary-small' weight='medium'>
						Очистить&nbsp;реквизиты
					</Typography.Text>
				</Button>
			</div>
			<Form onSubmit={handleSubmit} />
		</React.Fragment>
	);
};
