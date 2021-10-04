import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

import { SUPPORTED_CHAIN_IDS } from '../../constants';
import * as S from './styled';
import Layout from '../../components/Layout';
import UserHoldings from '../../components/UserHoldings';

const Home: React.FC = () => {
	const { active, account, activate, deactivate } = useWeb3React();

	const injected = new InjectedConnector({
		supportedChainIds: SUPPORTED_CHAIN_IDS,
	});

	const onConnect = async () => {
		await activate(injected).catch(error =>
			console.error('Failed to connect', error)
		);
	};

	const onDisconnect = () => {
		try {
			deactivate();
		} catch (error) {
			console.error('Failed to disconnect', error);
		}
	};

	return (
		<Layout title="settlements dashboard">
			<S.Wrapper>
				<S.Title>settlements dashboard</S.Title>
				<S.Description>
					<em>come frens, gaze upon your holdings</em>
					<br />
					<br />
					<small>
						a wip by{' '}
						<a
							href="https://twitter.com/zhoug0x"
							target="_blank"
							rel="noreferrer noopener"
						>
							zhoug
						</a>{' '}
						for{' '}
						<a
							href="https://thesettlements.world"
							target="_blank"
							rel="noreferrer noopener"
						>
							the settlements
						</a>
					</small>
				</S.Description>
				<S.WalletControls>
					{active ? (
						<>
							<S.WalletData>
								connected address: <strong>{account}</strong>
							</S.WalletData>
							<S.Button onClick={onDisconnect}>Disconnect</S.Button>
						</>
					) : (
						<>
							<S.WalletData>not connected</S.WalletData>
							<S.Button onClick={onConnect}>Connect to Wallet</S.Button>
						</>
					)}
				</S.WalletControls>
			{account && <UserHoldings address={account} />}
			</S.Wrapper>
		</Layout>
	);
};

export default Home;
