import { useState, useEffect } from 'react';

import { Island } from '../../types';
import { getERC721TokenIds } from '../../services/data.service';
import { getIslandsByIds } from '../../services/islands.service';
import { useWalletContext } from '../../contexts/WalletContext';
import { useIslandsContract } from '../../hooks';

import { Heading, CardGroup } from '../Shared';
import IslandCard from './IslandCard';

const Islands: React.FC = () => {
	const { address } = useWalletContext();
	const islandsContract = useIslandsContract();

	const [islands, setIslands] = useState<Island[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			if (address) {
				try {
					const ids = await getERC721TokenIds(address, islandsContract);
					const islandsData = await getIslandsByIds(ids, islandsContract);
					setIslands(islandsData);
					setIsLoading(false);
				} catch (error) {
					console.error(error);
				}
			}
		})();
	}, [address]);

	return !isLoading ? (
		<CardGroup>
			{islands.length > 0 ? (
				islands.map((island: Island) => (
					<IslandCard key={island.id} island={island} />
				))
			) : (
				<Heading>no islands</Heading>
			)}
		</CardGroup>
	) : (
		<CardGroup>
			<Heading>loading islands...</Heading>
		</CardGroup>
	);
};

export default Islands;
