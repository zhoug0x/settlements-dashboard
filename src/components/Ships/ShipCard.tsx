import React from 'react';

import { Ship } from '../../types';
import { toBalanceString } from '../../utils';
import { CardWrapper, ExtLink, TraitList } from '../Shared';

interface ShipCardProps {
	ship: Ship;
}

const ShipCard: React.FC<ShipCardProps> = ({ ship }) => {
	const {
		id,
		name,
		expedition,
		length,
		speed,
		status: { targetID, description, targetType },
		blocksUntilNext,
		route,
		rssBals,
	} = ship;

	return (
		<CardWrapper>
			<ExtLink href={`https://thesettlements.world/ship/${id}`}>
				<h3 style={{ margin: 0 }}>ship</h3>
				<h2 style={{ margin: 0 }}>
					<small>#</small>
					{id}
				</h2>
				<hr />
				<TraitList>
					<li>β΅ {name}</li>
					<li>π± {expedition}</li>
					<li>
						π {length}
						<small>ft</small>
					</li>
					<li>
						β© {speed}
						<small>km/h</small>
					</li>
				</TraitList>
				<hr />

				<div>
					<span>π</span>
					<span>{`${description} - ${targetType} #${targetID}`}</span>
				</div>
				<div>
					<span>β²οΈ ETA </span>
					<span>{`${blocksUntilNext} blocks`}</span>
				</div>

				<div>
					<span>πΊοΈ Route: </span>
					{route.map((point, index) => (
						<span key={`${point.id}-${Math.random()}`}>
							{`${point.type.slice(0, 1)}${point.id}${
								index + 1 !== route.length ? ', ' : ''
							}`}
						</span>
					))}
				</div>
				<hr />

				{rssBals.map(rss => (
					<p key={`${rss.name}-${Math.random()}`}>{`${rss.icon} ${
						rss.name
					}: ${toBalanceString(rss.balance)}`}</p>
				))}
			</ExtLink>
		</CardWrapper>
	);
};

export default ShipCard;
