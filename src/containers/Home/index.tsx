import React from 'react';

import { useWalletContext } from '../../contexts/WalletContext';
import * as S from './styled';
import Layout from '../../components/Layout';
import UserHoldings from '../../components/UserHoldings';
import { ExtLink, GithubIcon } from '../../components/Shared';

const Home: React.FC = () => {
	const { address, connectWallet, disconnectWallet } = useWalletContext();

	return (
		<Layout title="settlements dashboard">
			<S.Wrapper>
				<S.Title>settlements dashboard</S.Title>
				<S.Description>
					<em>GAZE UPON YOUR HOLDINGS...</em>

					<p>
						by <ExtLink href="https://twitter.com/zhoug0x">zhoug</ExtLink> for{' '}
						<ExtLink href="https://thesettlements.world">
							the settlements
						</ExtLink>
					</p>

					<div>
						<ExtLink href="https://github.com/zhoug0x/settlements-dashboard">
							<GithubIcon width="2em" />
						</ExtLink>
					</div>
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
							<S.Button onClick={() => connectWallet()}>
								Connect to Wallet
							</S.Button>
						</>
					)}
				</S.WalletControls>
			</S.Wrapper>
		</Layout>
	);
};

export default Home;
