import React from 'react';

import { Island } from '../../types';
import { toBalanceString } from '../../utils';
import { CardWrapper, ExtLink, TraitList } from '../Shared';

interface IslandCardProps {
	island: Island;
}

const IslandCard: React.FC<IslandCardProps> = ({ island }) => {
	const {
		id,
		traits: { climate, terrain, rss },
		size,
		pop,
		maxPop,
		taxRate,
		rssBal,
	} = island;

	return (
		<CardWrapper>
			<ExtLink href={`https://thesettlements.world/island/${id}`}>
				<h3 style={{ margin: 0 }}>island</h3>
				<h2 style={{ margin: 0 }}>
					<small>#</small>
					{id}
				</h2>
				<hr />
				<TraitList>
					<li>🌡️ {climate.name}</li>
					<li>🏞️ {terrain.name}</li>
					<li>📦 {rss.name}</li>
				</TraitList>
				<hr />
				<div>🌐 {`${size} sq mi`}</div>
				<div>👥 {`Pop. ${pop}/${maxPop}`}</div>
				<hr />
				<p>🪙 {`Tax Rate: ${taxRate}%`}</p>
				<p>{`${rss.icon} ${rss.name}: ${toBalanceString(rssBal)}`}</p>
			</ExtLink>
		</CardWrapper>
	);
};

export default IslandCard;
