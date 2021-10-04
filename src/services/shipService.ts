import { Contract } from '@ethersproject/contracts';
import { formatUnits } from '@ethersproject/units';
import { formatFixed } from '@ethersproject/bignumber';
import type { BigNumber } from '@ethersproject/bignumber';

import {
	SHIPS_ADDRESS,
	SHIPS_HELPER_ADDRESS,
	SHIP_STATUS,
	ISLANDS_ADDRESS,
	SETTLEMENTS_ADDRESS,
	RSS_MANIFEST,
} from '../constants';
import { parseBalance } from '../utils';
import { Ship } from '../types';
import shipsABI from '../abis/ships.json';
import shipsHelperABI from '../abis/ships-helper.json';

// TODO: type everything
const parseShipStatus = (statusKey: number, target: any): any => {
	return {
		description: SHIP_STATUS[statusKey - 1],
		statusKey,
		targetType: target.type,
		targetID: target.id,
	};
};

// TODO: type everything
const parseRouteData = (route: any): any => {
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
const parseShipData = (
	id: any,
	attr: any,
	bals: any,
	statusKey: number,
	target: any,
	blocksUntilNext: number
): Ship => {
	// Parse resource names & balances
	const rssBals = bals.map((bal: any) => {
		const myRss = RSS_MANIFEST.find(
			rss => rss.address === bal.resourceTokenContract
		);

		return {
			name: myRss?.name || 'Resource',
			balance: parseBalance(bal.amount),
		};
	});

	// Parse status & route
	const currentTarget = parseRouteData(target);
	const status = parseShipStatus(statusKey, currentTarget);
	const route = attr.route.map(parseRouteData);

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

// TODO: make promise type-safe if going to keep using this approach
export const getShipsByAddress = async (
	userAddress: string,
	library: any
): Promise<any> => {
	return new Promise<any>(async (resolve, reject) => {
		// Instaniate contract interfaces for ships and ships helper
		const shipsContract = new Contract(SHIPS_ADDRESS, shipsABI, library);
		const helperContract = new Contract(
			SHIPS_HELPER_ADDRESS,
			shipsHelperABI,
			library
		);

		// Get amount of users ships
		const result: string = await shipsContract
			.balanceOf(userAddress)
			.catch(() => {
				reject('Invalid ships user address');
				return '0';
			});

		const shipBalance: number = parseInt(formatUnits(result, 0));

		// If user has no ships, resolve an empty array
		if (shipBalance === 0) {
			resolve([]);
		}

		// Fetch user ship IDs
		const idPromises = [];
		for (let i = 0; i < shipBalance; i++) {
			idPromises.push(shipsContract.tokenOfOwnerByIndex(userAddress, i));
		}
		const idResult = await Promise.all(idPromises).catch(() => {
			reject('Failed to fetch ship IDs');
			return [];
		});

		const shipIDs = idResult.map((result: BigNumber) =>
			formatFixed(result, '0')
		);

		// Get data for each ship ID
		const dataPromises = shipIDs.map(id => {
			return Promise.all([
				shipsContract.getShipInfo(id),
				shipsContract.getUnharvestedTokens(id),
				helperContract.getStatus(id),
				helperContract.getCurrentTarget(id),
				helperContract.getBlocksUntilNextPhase(id),
			]);
		});
		const shipData = await Promise.all(dataPromises)
			.then(results =>
				results.map(([attr, bals, statusKey, target, blocksUntilNext], index) =>
					parseShipData(
						shipIDs[index],
						attr,
						bals,
						statusKey,
						target,
						blocksUntilNext
					)
				)
			)
			.catch(() => {
				reject('Failed to fetch ship attributes');
			});

		resolve(shipData);
	});
};
