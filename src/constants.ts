//~*~ Network stuff
export const SUPPORTED_CHAIN_IDS = [1, 3, 4, 5, 42];

//~*~ Addresses
export const SETTLEMENTS_ADDRESS = '0xc0981df196dc6c6fb8673b912b07956256d7e9ff';
export const ISLANDS_ADDRESS = '0x4700325FF1075Bd657237B6650DB53a076b92c23';
export const SHIPS_ADDRESS = '0xb091913861CC5E70668729144CfB8c611A4004F0';
export const SHIPS_HELPER_ADDRESS =
	'0x195c07dc554a609143b0e61866714435c757725f';

export enum RSS_ADDRESS {
	SETL = '0xDecd7C00c8e687b8A713df1D0acfc7f39837B5dA',
	IRON = '0xa6233451039230fAe712371dD7526f6Df7625E1f',
	GOLD = '0x044011824D5CbBb788965B11bF98dc1657407644',
	SILVER = '0xdef978a5402a6E2d963724f0717c38f0016B52ec',
	WOOD = '0xC754a679a319698F6C88ABEDb9B435f76DE0E14D',
	WOOL = '0x3EcCa678B1B595Aefa6B2eb21afaEd94cDcEb736',
	WATER = '0x7DD14dD66FF3f7A5FAda8B1AEb950521a455C818',
	GRASS = '0x06d16C5e84500e36971FeD4e9e1DD8183C1cD7Ef',
	FISH = '0x2676D86D4d474732e2761FA490F2B65bCaEa4B33',
	PEARL = '0xac709ce0bbd663f334bbef9525f56063d8c1e5ae',
	DIAMOND = '0xce174947bbbc84694f2bfcd0c694a11bbd3a44a4',
}

//~*~ Game constants
// WARNING: some array values are grabbed by index position, be careful if editing!
export const RSS_MANIFEST = [
	{ name: '$SETL', address: RSS_ADDRESS.SETL },
	{ name: 'Iron', address: RSS_ADDRESS.IRON },
	{ name: 'Gold', address: RSS_ADDRESS.GOLD },
	{ name: 'Silver', address: RSS_ADDRESS.SILVER },
	{ name: 'Wood', address: RSS_ADDRESS.WOOD },
	{ name: 'Wool', address: RSS_ADDRESS.WOOL },
	{ name: 'Water', address: RSS_ADDRESS.WATER },
	{ name: 'Grass', address: RSS_ADDRESS.GRASS },
	{ name: 'Fish', address: RSS_ADDRESS.FISH },
	{ name: 'Pearl', address: RSS_ADDRESS.PEARL },
	{ name: 'Diamond', address: RSS_ADDRESS.DIAMOND },
];

export const SETTLEMENTS_ATTR = {
	SIZES: [
		'Camp',
		'Hamlet',
		'Village',
		'Town',
		'District',
		'Precinct',
		'Capitol',
		'State',
	],
	SPIRITS: ['Earth', 'Fire', 'Water', 'Air', 'Astral'],
	AGES: [
		'Ancient',
		'Classical',
		'Medieval',
		'Renaissance',
		'Industrial',
		'Modern',
		'Information',
		'Future',
	],
	RESOURCES: [
		'Iron',
		'Gold',
		'Silver',
		'Wood',
		'Wool',
		'Water',
		'Grass',
		'Grain',
	],
	MORALES: [
		'Expectant',
		'Enlightened',
		'Dismissive',
		'Unhappy',
		'Happy',
		'Undecided',
		'Warring',
		'Scared',
		'Unruly',
		'Anarchist',
	],
	GOVERNMENTS: [
		'Democracy',
		'Communism',
		'Socialism',
		'Oligarchy',
		'Aristocracy',
		'Monarchy',
		'Theocracy',
		'Colonialism',
		'Dictatorship',
	],
	REALMS: ['Genesis', 'Valhalla', 'Keskella', 'Shadow', 'Plains', 'Ends'],
};

export const ISLANDS_ATTR = {
	RESOURCES: ['Fish', 'Wood', 'Iron', 'Silver', 'Pearl', 'Oil', 'Diamond'],
	CLIMATES: ['Temperate', 'Rainy', 'Humid', 'Arid', 'Tropical', 'Icy'],
	TERRAINS: ['Flatlands', 'Hilly', 'Canyons', 'Mountainous'],
};

export const SHIPS_ATTR = {
	NAMES: ['Canoe', 'Longship', 'Clipper', 'Galleon', 'Man-of-war'],
	EXPEDITIONS: ['Trader', 'Explorer', 'Pirate', 'Military', 'Diplomat'],
};

export const SHIP_STATUS = ['Sailing', 'Harvesting', 'Resting'];
