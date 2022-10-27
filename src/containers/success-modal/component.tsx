import React, { FC } from 'react';
import cn from 'classnames';

import {
	ModalMobile,
	ModalMobileProps as DefaultModalMobileProps,
} from '@alfalab/core-components/modal/mobile';
import { Typography } from '@alfalab/core-components/typography';
import { IconButton } from '@alfalab/core-components/icon-button';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';
import { ConfirmationMobile } from '@alfalab/core-components/confirmation/component.mobile';
import { SuperEllipse } from '@alfalab/core-components/icon-view/super-ellipse';
import { CheckmarkMIcon } from '@alfalab/icons-glyph/CheckmarkMIcon';
import { ActionButton } from '@alfalab/core-components/action-button';
import { PlusMIcon } from '@alfalab/icons-glyph/PlusMIcon';
import { DocumentLinesLineMIcon } from '@alfalab/icons-glyph/DocumentLinesLineMIcon';
import { Button } from '@alfalab/core-components/button';
// @ts-ignore
import styles from './component.module.css';
import { useConfirmation } from '@alfalab/core-components/confirmation';

export type ModalMobileProps = DefaultModalMobileProps & {
	success: boolean;
	onInputFinished: () => void;
};

const handleSmsRetryClick = () => null;

export const SuccessModal: FC<ModalMobileProps> = ({
	open,
	success,
	onInputFinished,
	onClose,
	...props
}) => {
	const { confirmationScreen, confirmationState, setConfirmationScreen, setConfirmationState } =
		useConfirmation();

	const handleInputFinished = () => {
		setTimeout(() => {
			setConfirmationState('INITIAL');
			onInputFinished();
		}, 1000);
	};

	return (
		<ModalMobile open={open} onClose={onClose}>
			<ModalMobile.Header
				sticky={true}
				align='center'
				hasCloser={false}
				contentClassName={styles.headerContent}
				className={styles.header}
			>
				{!success ? (
					<React.Fragment>
						<Typography.Text view='component' weight='medium'>
							Введите код из сообщения
						</Typography.Text>
						<IconButton
							view='secondary'
							onClick={onClose}
							className={styles.headerAddon}
							icon={CrossMIcon}
						/>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Typography.Text tag='div' view='component' weight='medium'>
							Перевод выполнен
						</Typography.Text>
						<Typography.Text
							tag='div'
							className={styles.lightText}
							view='primary-small'
							weight='medium'
						>
							Счёт списания ··6781
						</Typography.Text>
					</React.Fragment>
				)}
			</ModalMobile.Header>
			<ModalMobile.Content
				className={cn(styles.content, { [styles.successContent]: success })}
			>
				{!success ? (
					<ConfirmationMobile
						screen={confirmationScreen}
						onChangeScreen={setConfirmationScreen}
						onChangeState={setConfirmationState}
						onInputFinished={handleInputFinished}
						onSmsRetryClick={handleSmsRetryClick}
						state={confirmationState}
						alignContent='center'
						phone='+7 ••• ••• 08 88'
					/>
				) : (
					<React.Fragment>
						<SuperEllipse backgroundColor='var(--color-light-graphic-positive)'>
							<CheckmarkMIcon fill='#ffff' />
						</SuperEllipse>
						<Typography.TitleMobile className={styles.sum} tag='div' view='large'>
							-5 750,00 ₽
						</Typography.TitleMobile>
						<Typography.Text
							className={styles.commission}
							tag='div'
							view='primary-medium'
						>
							Комиссия 150 ₽
						</Typography.Text>
						<Typography.Text
							tag='div'
							className={cn(styles.recipient, styles.lightText)}
							view='primary-medium'
						>
							ИП Коряковцева Валерия Константиновна в Альфа-банк по реквизитам
						</Typography.Text>
						<div className={styles.successContentIconsContainer}>
							<ActionButton
								iconWrapperClassName={styles.actionButton}
								icon={<PlusMIcon />}
							>
								<Typography.Text className={styles.actionButtonDescription}>
									Посмотреть чек
								</Typography.Text>
							</ActionButton>
							<ActionButton
								iconWrapperClassName={styles.actionButton}
								icon={<DocumentLinesLineMIcon />}
							>
								<Typography.Text className={styles.actionButtonDescription}>
									Создать шаблон
								</Typography.Text>
							</ActionButton>
						</div>
					</React.Fragment>
				)}
				{success && (
					<ModalMobile.Footer className={styles.footer} layout='center' sticky>
						<Button onClick={onClose} view='primary' block={true}>
							Готово
						</Button>
					</ModalMobile.Footer>
				)}
			</ModalMobile.Content>
		</ModalMobile>
	);
};
