import React from 'react';

import { useWalletContext } from '../../contexts/WalletContext';
import * as S from './styled';
import Layout from '../../components/Layout';
import UserHoldings from '../../components/UserHoldings';

const Home: React.FC = () => {
	const { address, connectWallet, disconnectWallet } = useWalletContext();

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
					{address ? (
						<>
							<S.WalletData>
								connected address: <strong>{address}</strong>
							</S.WalletData>
							<S.Button onClick={() => disconnectWallet()}>Disconnect</S.Button>
							<UserHoldings address={address} />
						</>
					) : (
						<>
							<S.WalletData>not connected</S.WalletData>
							<S.Button onClick={() => connectWallet()}>Connect to Wallet</S.Button>
						</>
					)}
				</S.WalletControls>
			</S.Wrapper>
		</Layout>
	);
};

export default Home;
