import React from 'react';

import { Island } from '../types';
import { toBalanceString } from '../utils';
import { CardWrapper } from './Shared';

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
			<a
				href={`https://thesettlements.world/island/${id}`}
				target="_blank"
				rel="noreferrer noopener"
			>
				<h3 style={{ margin: 0 }}>island</h3>
				<h2 style={{ margin: 0 }}>
					<small>#</small>
					{id}
				</h2>
				<hr />
				<ul>
					<li>{climate.name}</li>
					<li>{terrain.name}</li>
					<li>{rss.name}</li>
				</ul>
				<hr />
				<div>{`${size} sq mi`}</div>
				<div>{`Pop. ${pop}/${maxPop}`}</div>
				<hr />
				<p>{`Tax Rate: ${taxRate}%`}</p>
				<p>{`${rss.name}: ${toBalanceString(rssBal)}`}</p>
			</a>
		</CardWrapper>
	);
};

export default IslandCard;
