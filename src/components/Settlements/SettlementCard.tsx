import React from 'react';

import { Settlement } from '../../types';
import { toBalanceString } from '../../utils';
import { CardWrapper } from '../Shared';

interface SettlementCardProps {
	settlement: Settlement;
}

const SettlementCard: React.FC<SettlementCardProps> = ({ settlement }) => {
	const { id, traits, rssBal } = settlement;

	return (
		<CardWrapper>
			<a
				href={`https://thesettlements.world/settlement/${id}`}
				target="_blank"
				rel="noreferrer noopener"
			>
				<h3 style={{ margin: 0 }}>settlement</h3>
				<h2 style={{ margin: 0 }}>
					<small>#</small>
					{id}
				</h2>
				<hr />
				<ul>
					<li>{traits.size.name}</li>
					<li>{traits.spirit.name}</li>
					<li>{traits.age.name}</li>
					<li>{traits.rss.name}</li>
					<li>{traits.morale.name}</li>
					<li>{traits.gov.name}</li>
					<li>{traits.realm.name}</li>
				</ul>
				<hr />
				<p>{`${traits.rss.name}: ${toBalanceString(rssBal)}`}</p>
			</a>
		</CardWrapper>
	);
};

export default SettlementCard;
