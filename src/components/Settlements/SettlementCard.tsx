import React from 'react';

import { Settlement } from '../../types';
import { toBalanceString } from '../../utils';
import { CardWrapper, ExtLink, TraitList } from '../Shared';

interface SettlementCardProps {
	settlement: Settlement;
}

const SettlementCard: React.FC<SettlementCardProps> = ({ settlement }) => {
	const { id, traits, rssBal } = settlement;

	return (
		<CardWrapper>
			<ExtLink href={`https://thesettlements.world/settlement/${id}`}>
				<h3 style={{ margin: 0 }}>settlement</h3>
				<h2 style={{ margin: 0 }}>
					<small>#</small>
					{id}
				</h2>
				<hr />
				<TraitList>
					<li>🌐 {traits.size.name}</li>
					<li>🕯️ {traits.spirit.name}</li>
					<li>⏳ {traits.age.name}</li>
					<li>📦 {traits.rss.name}</li>
					<li>🎭 {traits.morale.name}</li>
					<li>⚖️ {traits.gov.name}</li>
					<li>🌀 {traits.realm.name}</li>
				</TraitList>
				<hr />
				<p>{`${traits.rss.icon} ${traits.rss.name}: ${toBalanceString(rssBal)}`}</p>
			</ExtLink>
		</CardWrapper>
	);
};

export default SettlementCard;
