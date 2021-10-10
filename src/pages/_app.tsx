import type { AppProps } from 'next/app';

import { StylesProvider, Web3Provider } from '../providers';
import { WalletContextProvider } from '../contexts/WalletContext';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<Web3Provider>
			<WalletContextProvider>
				<StylesProvider>
					<Component {...pageProps} />
				</StylesProvider>
			</WalletContextProvider>
		</Web3Provider>
	);
};

export default App;
