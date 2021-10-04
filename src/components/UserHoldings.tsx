import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';

import { Settlement, Island, Ship } from '../types';
import { getSettlementsByAddress } from '../services/settlementService';
import { getIslandsByAddress } from '../services/islandService';
import { getShipsByAddress } from '../services/shipService';

import SettlementCard from './SettlementCard';
import IslandCard from './IslandCard';
import ShipCard from './ShipCard';

const Heading = styled.div`
	font-size: 3.5rem;
	letter-spacing: -0.05em;
	margin: 3rem 0 2rem 0;
`;

const CardGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

// TODO: type-safe the library
const getAllData = async (address: string, library: any) => {
	const promises = [
		getSettlementsByAddress(address, library),
		getIslandsByAddress(address, library),
		getShipsByAddress(address, library),
	];

	const [settlements, islands, ships] = await Promise.all(promises);
	return { settlements, islands, ships };
};

interface UserHoldingsProps {
	address: string;
}

const UserHoldings: React.FC<UserHoldingsProps> = ({ address }) => {
	const { library } = useWeb3React();
	const [settlements, setSettlements] = useState<Settlement[]>([]);
	const [islands, setIslands] = useState<Island[]>([]);
	const [ships, setShips] = useState<Ship[]>([]);
	const [isLoading, setisLoading] = useState<boolean>(true);

	// Fetch all data on page load
	useEffect(() => {
		if (address) {
			getAllData(address, library).then(
				(data: {
					settlements: Settlement[];
					islands: Island[];
					ships: Ship[];
				}) => {
					setSettlements(data.settlements);
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
			{settlements ? (
				<CardGroup>
					{settlements.map((settlement: Settlement) => {
						return (
							<SettlementCard key={settlement.id} settlement={settlement} />
						);
					})}
				</CardGroup>
			) : (
				<>
					<Heading>no settlements...</Heading>
					<hr />
				</>
			)}

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
