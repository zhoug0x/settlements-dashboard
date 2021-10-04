import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import type { AppProps } from 'next/app';
import type {
	ExternalProvider,
	JsonRpcFetchFunc,
} from '@ethersproject/providers';
import StylesProvider from '../styles/StylesProvider';

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
	return new Web3Provider(provider);
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<StylesProvider>
				<Component {...pageProps} />
			</StylesProvider>
		</Web3ReactProvider>
	);
};

export default App;
