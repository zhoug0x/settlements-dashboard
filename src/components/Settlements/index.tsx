import { useState, useEffect } from 'react';

import { Settlement } from '../../types';
import { useSettlementsContract } from '../../hooks';
import { useWalletContext } from '../../contexts/WalletContext';
import { getERC721TokenIds } from '../../services/data.service';
import { getSettlementsByIds } from '../../services/settlements.service';

import { Heading, CardGroup } from '../Shared';
import SettlementCard from './SettlementCard';

const Settlements: React.FC = () => {
	const { address } = useWalletContext();
	const settlementsContract = useSettlementsContract();

	const [settlements, setSettlements] = useState<Settlement[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			if (address) {
				try {
					const ids = await getERC721TokenIds(address, settlementsContract);
					const settlementsData = await getSettlementsByIds(
						ids,
						settlementsContract
					);
					setSettlements(settlementsData);
					setIsLoading(false);
				} catch (error) {
					console.error(error);
				}
			}
		})();
	}, [address]);

	return !isLoading ? (
		<CardGroup>
			{settlements.length > 0 ? (
				settlements.map((settlement: Settlement) => (
					<SettlementCard key={settlement.id} settlement={settlement} />
				))
			) : (
				<Heading>no settlements</Heading>
			)}
		</CardGroup>
	) : (
		<CardGroup>
			<Heading>loading islands...</Heading>
		</CardGroup>
	);
};

export default Settlements;
