import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
	body {
		font-size: 16px;
		font-family: sans-serif;
		color: ${({ theme }) => theme.colors.text};
		background-color: ${({ theme }) => theme.colors.background};
	}
	
	a {
		text-decoration: none;
		color: ${({ theme }) => theme.colors.link};

		&:hover {
			opacity: 0.8;
		}

	}
`;

const StylesProvider: React.FC = ({ children }) => {
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
