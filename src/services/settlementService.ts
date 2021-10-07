import { Contract } from '@ethersproject/contracts';
import { formatUnits } from '@ethersproject/units';
import { formatFixed } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';

import { Settlement } from '../types';
import { SETTLEMENTS_ADDRESS, SETTLEMENTS_ATTR } from '../constants';
import { useContract } from '../hooks';
import { parseBalance } from '../utils';
import settlementsABI from '../abis/settlements.json';

// TODO: type everything
const parseSettlementData = (id: any, attr: any, bal: any): Settlement => {
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
			rss: { name: SETTLEMENTS_ATTR.RESOURCES[attr[3]], key: attr[3] },
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

// TODO: make promise type-safe if going to keep using this approach
export const getSettlementsByAddress = async (
	userAddress: string,
	library: any
): Promise<any> => {
	return new Promise<any>(async (resolve, reject) => {
		// const contract = new Contract(SETTLEMENTS_ADDRESS, settlementsABI, library);
		const {contract} = useContract(SETTLEMENTS_ADDRESS, settlementsABI)


		// Get amount of users settlements
		const result: string = await contract.balanceOf(userAddress).catch(() => {
			reject('Invalid settlements user address');
			return '0';
		});

		const settlementBalance: number = parseInt(formatUnits(result, 0));

		// If user has no settlements, resolve an empty array
		if (settlementBalance === 0) {
			resolve([]);
		}

		// Fetch user settlement IDs
		const idPromises = [];
		for (let i = 0; i < settlementBalance; i++) {
			idPromises.push(contract.tokenOfOwnerByIndex(userAddress, i));
		}
		const idResult = await Promise.all(idPromises).catch(() => {
			reject('Failed to fetch settlement IDs');
			return [];
		});

		const settlementIDs = idResult.map((result: BigNumber) =>
			formatFixed(result, '0')
		);

		// Get data for each settlement ID
		const dataPromises = settlementIDs.map(id => {
			return Promise.all([
				contract.attrIndex(id),
				contract.getUnharvestedTokens(id),
			]);
		});
		const settlementData = await Promise.all(dataPromises)
			.then(results =>
				results.map(([attr, bal], index) =>
					parseSettlementData(settlementIDs[index], attr, bal)
				)
			)
			.catch(() => {
				reject('Failed to fetch settlement attributes');
			});

		resolve(settlementData);
	});
};
