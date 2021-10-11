import { useState, useEffect } from 'react';

import { Ship } from '../../types';
import { getERC721TokenIds } from '../../services/data.service';
import { getShipsByIds } from '../../services/ships.service';
import { useWalletContext } from '../../contexts/WalletContext';
import { useShipsContract } from '../../hooks';

import { Heading, CardGroup } from '../Shared';
import ShipCard from './ShipCard';

const Ships: React.FC = () => {
	const { address } = useWalletContext();
	const { shipsContract, shipsHelperContract } = useShipsContract();

	const [ships, setShips] = useState<Ship[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			if (address) {
				try {
					const ids = await getERC721TokenIds(address, shipsContract);
					const shipsData = await getShipsByIds(
						ids,
						shipsContract,
						shipsHelperContract
					);
					setShips(shipsData);
					setIsLoading(false);
				} catch (error) {
					console.error(error);
				}
			}
		})();
	}, [address]);

	return !isLoading ? (
		<CardGroup>
			{ships.length > 0 ? (
				ships.map((ship: Ship) => <ShipCard key={ship.id} ship={ship} />)
			) : (
				<Heading>no ships</Heading>
			)}
		</CardGroup>
	) : (
		<CardGroup>
			<Heading>loading islands...</Heading>
		</CardGroup>
	);
};

export default Ships;
