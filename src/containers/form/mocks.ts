export const recipient = [
	{ id: 1, subTitle: '7728168971', title: 'ИП КОРЯКОВЦЕВА ВАЛЕРИЯ КОНСТАНТИНОВНА' },
	{ id: 2, subTitle: '7728168971', title: 'ИП КОРЯКОВЦЕВА ВАЛЕРИЯ КОНСТАНТИНОВНА' },
	{ id: 3, subTitle: '7728168971', title: 'ИП КОРЯКОВЦЕВА ВАЛЕРИЯ КОНСТАНТИНОВНА' },
];

export const recipientBanks = [
	{
		id: 1,
		title: 'АО "АЛЬФА-БАНК" г. Москва',
		subTitle: 'БИК 044525999',
		description: 'Кор. счёт 30101 810 8 45250000 999',
	},
];

export const recipientBankNumbers = [
	{ id: 1, title: '40911 810 7 0185 0000001', subTitle: 'АО "АЛЬФА-БАНК" г. Москва' },
	{ id: 2, title: '40911 810 7 0185 0000002', subTitle: 'АО "АЛЬФА-БАНК" г. Москва' },
];

export const tabs = [
	{ id: 1, title: 'Не заполнено' },
	{ id: 2, title: 'НДС не облагается' },
	{ id: 3, title: 'Плюс 10% НДС' },
	{ id: 4, title: 'В т.ч. НДС 10%' },
	{ id: 5, title: 'Плюс 18% НДС' },
	{ id: 6, title: 'В т.ч. НДС 18%' },
	{ id: 7, title: 'Плюс 20% НДС', text: 'Плюс 20% НДС, 20000.00 руб.' },
	{ id: 8, title: 'В т.ч. НДС 20%' },
];

export const urgencyOptions = [
	{
		id: 1,
		label: 'Стандартный операционный день',
		hint: 'Отправка в рамках операционного дня, установленного тарифом',
	},
	{
		id: 2,
		label: 'Продлённый операционный день',
		hint: 'Отправка до 19:50 мск. Ваш тариф может предусматривать дополнительную комиссию',
	},
	{
		id: 3,
		label: 'Срочный платёж',
		hint: 'Отправка от 3 минут до 2 часов в рамках вашего операционного дня через сервис срочного перевода банка России. Ваш тариф может предусматривать комиссию',
	},
];

export const orderOptions = [
	{
		id: 5,
		label: `5 — перечисления в бюджетную систему РФ, в том числе налоги, сборы и гос. пошлины, а также иные текущие платежи (оплата за товары и услуги)`,
	},
	{
		id: 4,
		label: `4 — взыскание по иным исполнительным документам, не указанным в пунктах 1 и 2`,
	},
	{
		id: 3,
		label: `3 — перечисления для расчётов по оплате труда (перечисление заработной платы). А также взыскание задолженности по уплате налогов и сборов (по поручениям уполномоченных органов)`,
	},
	{
		id: 2,
		label: `2 — взыскание по исполнительным документам для расчётов по оплате труда и выплате выходных пособий`,
	},
	{
		id: 1,
		label: `1 — взыскание по исполнительным документам компенсации вреда, причинённого жизни и здоровью работника, а также алиментов`,
	},
];