import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { theme, GlobalStyle } from '../styles';

// TODO: replace `children: any` solution
const StylesProvider: React.FC<{ children: any }> = ({ children }) => {
	return (
		<>
			<Normalize />
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				{children}
			</ThemeProvider>
		</>
	);
};

export default StylesProvider;
