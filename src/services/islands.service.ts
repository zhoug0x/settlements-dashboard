import { Contract } from '@ethersproject/contracts';

import { ISLANDS_ATTR } from '../constants';
import { Island } from '../types';
import { parseBalance } from '../utils';

// TODO: type everything
const _parseIslandData = (
	id: string,
	attr: any,
	bal: any,
	info: any
): Island => {
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

export const getIslandsByIds = async (
	ids: string[],
	contract: Contract
): Promise<Island[]> => {
	return new Promise(async (resolve, reject) => {
		const promises = ids.map((id: string) => {
			return Promise.all([
				contract.getTokenIdToAttributes(id),
				contract.getTaxIncome(id),
				contract.getIslandInfo(id),
			]).catch(error => {
				reject(error);
			});
		});

		const islandsData =
			(await Promise.all(promises)
				.then(results =>
					results.map(([attr, bal, info]: any, index: number) =>
						_parseIslandData(ids[index], attr, bal, info)
					)
				)
				.catch(error => {
					reject(error);
				})) || [];

		resolve(islandsData);
	});
};
