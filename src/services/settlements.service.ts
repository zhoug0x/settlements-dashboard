import { Contract } from '@ethersproject/contracts';

import { SETTLEMENTS_ATTR } from '../constants';
import { Settlement } from '../types';
import { parseBalance } from '../utils';

// TODO: type everything
const _parseSettlementData = (id: string, attr: any, bal: any): Settlement => {
	return {
		id,
		traits: {
			size: {
				name: SETTLEMENTS_ATTR.SIZES[attr[0]],
				key: attr[0],
			},
			spirit: {
				name: SETTLEMENTS_ATTR.SPIRITS[attr[1]],
				key: attr[1],
			},
			age: { name: SETTLEMENTS_ATTR.AGES[attr[2]], key: attr[2] },
			rss: {
				name: SETTLEMENTS_ATTR.RESOURCES[attr[3]].name,
				key: attr[3],
				icon: SETTLEMENTS_ATTR.RESOURCES[attr[3]].icon,
			},
			morale: {
				name: SETTLEMENTS_ATTR.MORALES[attr[4]],
				key: attr[4],
			},
			gov: {
				name: SETTLEMENTS_ATTR.GOVERNMENTS[attr[5]],
				key: attr[5],
			},
			realm: { name: SETTLEMENTS_ATTR.REALMS[attr[6]], key: attr[6] },
		},
		rssBal: parseBalance(bal[1]),
	};
};

export const getSettlementsByIds = async (
	ids: string[],
	contract: Contract
): Promise<Settlement[]> => {
	return new Promise(async (resolve, reject) => {
		const promises = ids.map((id: string) => {
			return Promise.all([
				contract.attrIndex(id),
				contract.getUnharvestedTokens(id),
			]).catch(error => {
				reject(error);
			});
		});

		const settlementsData =
			(await Promise.all(promises)
				.then(results =>
					results.map(([attr, bal]: any, index: number) =>
						_parseSettlementData(ids[index], attr, bal)
					)
				)
				.catch(error => {
					reject(error);
				})) || [];

		resolve(settlementsData);
	});
};
