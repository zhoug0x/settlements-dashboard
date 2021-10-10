import React from 'react';

import { Heading } from './Shared';
import Settlements from './Settlements';
import Islands from './Islands';
import Ships from './Ships';

interface UserHoldingsProps {
	address: string;
}

const UserHoldings: React.FC<UserHoldingsProps> = () => {
	return (
		<>
			<Heading>🏰 settlements</Heading>
			<Settlements />

			<Heading>🏝️ islands</Heading>
			<Islands />

			<Heading>⛵ ships</Heading>
			<Ships />
		</>
	);
};

export default UserHoldings;
