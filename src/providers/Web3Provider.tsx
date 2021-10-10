import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider as W3Provider } from '@ethersproject/providers';
import type {
	ExternalProvider,
	JsonRpcFetchFunc,
} from '@ethersproject/providers';

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
	return new W3Provider(provider);
};

const Web3Provider: React.FC = ({ children }) => (
	<Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
);

export default Web3Provider;
