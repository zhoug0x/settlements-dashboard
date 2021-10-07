import { useState, useEffect } from 'react';

import { SETTLEMENTS_ADDRESS, SETTLEMENTS_ATTR } from '../../constants';
import { Settlement } from '../../types';
import { useContract } from '../../hooks';
import settlementsABI from '../../abis/settlements.json';

import { Heading, CardGroup } from '../Shared';
import SettlementCard from './SettlementCard';

const Settlements = () => {
	const { contract } = useContract(SETTLEMENTS_ADDRESS, settlementsABI);
	const [settlements, setSettlements] = useState<Settlement[]>([]);

	useEffect(() => {
		console.log('settlements contract:', contract);
	}, [contract]);

	return settlements ? (
		<CardGroup>
			{settlements.map((settlement: Settlement) => {
				return <SettlementCard key={settlement.id} settlement={settlement} />;
			})}
		</CardGroup>
	) : (
		<>
			<Heading>no settlements...</Heading>
			<hr />
		</>
	);
};

export default Settlements;
