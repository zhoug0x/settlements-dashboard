import { Contract } from '@ethersproject/contracts';
import { formatUnits } from '@ethersproject/units';
import { formatFixed } from '@ethersproject/bignumber';
import type { BigNumber } from '@ethersproject/bignumber';

import { ISLANDS_ADDRESS, ISLANDS_ATTR } from '../constants';
import { parseBalance } from '../utils';
import { Island } from '../types';
import islandsABI from '../abis/islands.json';

// TODO: type everything
const parseIslandData = (id: any, attr: any, bal: any, info: any): Island => {
	return {
		id,
		traits: {
			rss: {
				name: ISLANDS_ATTR.RESOURCES[attr[0]],
				key: attr[0],
			},
			climate: {
				name: ISLANDS_ATTR.CLIMATES[attr[1]],
				key: attr[1],
			},
			terrain: { name: ISLANDS_ATTR.TERRAINS[attr[2]], key: attr[2] },
		},
		size: info.area,
		pop: info.population,
		maxPop: info.maxPopulation,
		taxRate: info.taxRate,
		rssBal: parseBalance(bal[1]),
	};
};

// TODO: make promise type-safe if going to keep using this approach
export const getIslandsByAddress = async (
	userAddress: string,
	library: any
): Promise<any> => {
	return new Promise<any>(async (resolve, reject) => {
		const contract = new Contract(ISLANDS_ADDRESS, islandsABI, library);

		// Get amount of users islands
		const result: string = await contract.balanceOf(userAddress).catch(() => {
			reject('Invalid islands user address');
			return '0';
		});

		const islandBalance: number = parseInt(formatUnits(result, 0));

		// If user has no islands, resolve an empty array
		if (islandBalance === 0) {
			resolve([]);
		}

		// Fetch user island IDs
		const idPromises = [];
		for (let i = 0; i < islandBalance; i++) {
			idPromises.push(contract.tokenOfOwnerByIndex(userAddress, i));
		}
		const idResult = await Promise.all(idPromises).catch(() => {
			reject('Failed to fetch island IDs');
			return [];
		});

		const islandIDs = idResult.map((result: BigNumber) =>
			formatFixed(result, '0')
		);

		// Get data for each island ID
		const dataPromises = islandIDs.map(id => {
			return Promise.all([
				contract.getTokenIdToAttributes(id),
				contract.getTaxIncome(id),
				contract.getIslandInfo(id),
			]);
		});
		const islandData = await Promise.all(dataPromises)
			.then(results =>
				results.map(([attr, bal, info], index) =>
					parseIslandData(islandIDs[index], attr, bal, info)
				)
			)
			.catch(() => {
				reject('Failed to fetch island attributes');
			});

		resolve(islandData);
	});
};
