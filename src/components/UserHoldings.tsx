import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { Island, Ship } from '../types';

import { getIslandsByAddress } from '../services/islandService';
import { getShipsByAddress } from '../services/shipService';

import IslandCard from './IslandCard';
import ShipCard from './ShipCard';

import { Heading, CardGroup } from './Shared';

import Settlements from './Settlements';

// TODO: type-safe the library
const getAllData = async (address: string, library: any) => {
	const promises = [
		getIslandsByAddress(address, library),
		getShipsByAddress(address, library),
	];

	const [islands, ships] = await Promise.all(promises);
	return { islands, ships };
};

interface UserHoldingsProps {
	address: string;
}

const UserHoldings: React.FC<UserHoldingsProps> = ({ address }) => {
	const { library } = useWeb3React();

	const [islands, setIslands] = useState<Island[]>([]);
	const [ships, setShips] = useState<Ship[]>([]);
	const [isLoading, setisLoading] = useState<boolean>(true);

	// Fetch all data on page load
	useEffect(() => {
		if (address) {
			getAllData(address, library).then(
				(data: { islands: Island[]; ships: Ship[] }) => {
					setIslands(data.islands);
					setShips(data.ships);
					setisLoading(false);
				}
			);
		}
	}, [address]);

	return !isLoading ? (
		<>
			<Heading>🏰 settlements</Heading>
			<Settlements />

			<Heading>🏝️ islands</Heading>
			{islands ? (
				<CardGroup>
					{islands.map((island: Island) => {
						return <IslandCard key={island.id} island={island} />;
					})}
				</CardGroup>
			) : (
				<>
					<Heading>no islands...</Heading>
					<hr />
				</>
			)}

			<Heading>⛵ ships</Heading>
			{ships ? (
				<CardGroup>
					{ships.map((ship: Ship) => {
						return <ShipCard key={ship.id} ship={ship} />;
					})}
				</CardGroup>
			) : (
				<>
					<Heading>no ships...</Heading>
					<hr />
				</>
			)}
		</>
	) : (
		<pre>gathering holdings...</pre>
	);
};

export default UserHoldings;
