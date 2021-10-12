import { Contract } from '@ethersproject/contracts';
import { formatFixed } from '@ethersproject/bignumber';

import {
	SHIP_STATUS,
	ISLANDS_ADDRESS,
	SETTLEMENTS_ADDRESS,
	RSS,
} from '../constants';
import { parseBalance } from '../utils';
import { Ship } from '../types';

// TODO: type everything
const _parseShipStatus = (statusKey: number, target: any): any => {
	return {
		description: SHIP_STATUS[statusKey],
		statusKey,
		targetType: target.type,
		targetID: target.id,
	};
};

// TODO: type everything
const _parseRouteData = (route: any): any => {
	const routeAddress = route.tokenContract.toLowerCase();
	let type;
	if (routeAddress === SETTLEMENTS_ADDRESS.toLowerCase()) {
		type = 'Settlement';
	} else if (routeAddress === ISLANDS_ADDRESS.toLowerCase()) {
		type = 'Island';
	}
	return {
		type,
		id: formatFixed(route.tokenId),
	};
};

// TODO: type everything
const _parseShipData = (
	id: any,
	attr: any,
	bals: any,
	statusKey: number,
	target: any,
	blocksUntilNext: number
): Ship => {
	// Parse resource names & balances
	const rssBals = bals.map((bal: any) => {
		const myRss = RSS.find(
			(rss: any) => rss.address === bal.resourceTokenContract
		);

		return {
			name: myRss?.name || 'Resource',
			icon: myRss?.icon || 'Resource',
			balance: parseBalance(bal.amount),
		};
	});

	// Parse status & route
	const currentTarget = _parseRouteData(target);
	const status = _parseShipStatus(statusKey, currentTarget);
	const route = attr.route.map(_parseRouteData);

	return {
		id,
		name: attr.name,
		expedition: attr.expedition,
		length: attr._length,
		speed: attr.speed,
		status,
		blocksUntilNext: parseInt(formatFixed(blocksUntilNext)),
		route,
		rssBals,
	};
};

export const getShipsByIds = async (
	ids: string[],
	shipsContract: Contract,
	helperContract: Contract
): Promise<Ship[]> => {
	return new Promise(async (resolve, reject) => {
		const promises = ids.map((id: string) => {
			return Promise.all([
				shipsContract.getShipInfo(id),
				shipsContract.getUnharvestedTokens(id),
				helperContract.getStatus(id),
				helperContract.getCurrentTarget(id),
				helperContract.getBlocksUntilNextPhase(id),
			]).catch(error => {
				reject(error);
			});
		});

		const shipsData =
			(await Promise.all(promises)
				.then(results =>
					results.map(
						(
							[attr, bals, statusKey, target, blocksUntilNext]: any,
							index: number
						) =>
							_parseShipData(
								ids[index],
								attr,
								bals,
								statusKey,
								target,
								blocksUntilNext
							)
					)
				)
				.catch(error => {
					reject(error);
				})) || [];

		resolve(shipsData);
	});
};
