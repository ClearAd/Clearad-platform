import { AdUnit, AdSlot, Campaign, Account } from 'adex-models'
import dateUtils from 'helpers/dateUtils'

let initialState = {
	account: new Account(),
	signin: {
		name: '',
		email: '',
		password: '',
		passConfirm: '',
		seed: '',
		publicKey: '',
		seedCheck: [],
		authenticated: false,
	},
	newItem: {
		Campaign: new Campaign().plainObj(),
		AdUnit: new AdUnit({ temp: { addUtmLink: true } }).plainObj(),
		AdSlot: new AdSlot().plainObj(),
	},
	currentItem: {},
	selectedItems: {
		campaings: [],
		adUnits: [],
		slots: [],
	},
	items: {
		Campaign: {},
		AdUnit: {},
		AdSlot: {},
		Website: {},
	},
	spinners: {},
	ui: {
		global: {},
		byIdentity: {},
	},
	toasts: [],
	confirm: {
		data: {},
	},
	nav: {
		side: '',
	},
	language: 'en-US',
	validations: {},
	newTransactions: {
		default: {},
	},
	web3Transactions: {},
	tags: {},
	identity: {},
	ethNetwork: {
		networkId: null,
		gasData: {},
	},
	wallet: {},
	config: {
		relayer: {},
		market: {},
		validators: {},
	},
	analytics: {
		timeframe: 'day',
		period: {
			start: +dateUtils.startOfDay(dateUtils.date()),
			end: +dateUtils.endOfDay(dateUtils.date()),
		},
	},
	channels: {
		withBalanceAll: {},
		withOutstandingBalance: [],
	},
	ensAddresses: {},
}

export default initialState
