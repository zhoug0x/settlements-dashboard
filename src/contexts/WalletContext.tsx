import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

import { SUPPORTED_CHAIN_IDS } from '../constants';

interface WalletContextProps {
	address?: string;
	connectWallet: Function;
	disconnectWallet: Function;
}

const WalletContext = createContext<WalletContextProps>({
	address: undefined,
	connectWallet: () => {},
	disconnectWallet: () => {},
});

export const useWalletContext = () => useContext(WalletContext);

export const WalletContextProvider: React.FC<{ children: any }> = ({
	children,
}) => {
	const { active, account, activate, deactivate } = useWeb3React();
	const [address, setAddress] = useState<string | undefined>(undefined);
	const injected = useMemo(
		() =>
			new InjectedConnector({
				supportedChainIds: SUPPORTED_CHAIN_IDS,
			}),
		[]
	);

	useEffect(() => {
		if (active && typeof account === 'string' && account !== address) {
			setAddress(account);
		}
	}, [active]);

	const connectWallet = async () => {
		await activate(injected).catch(error =>
			console.error('Failed to connect', error)
		);
	};

	const disconnectWallet = () => {
		try {
			setAddress(undefined);
			deactivate();
		} catch (error) {
			console.error('Failed to disconnect', error);
		}
	};

	return (
		<WalletContext.Provider
			value={{ address, connectWallet, disconnectWallet }}
		>
			{children}
		</WalletContext.Provider>
	);
};
