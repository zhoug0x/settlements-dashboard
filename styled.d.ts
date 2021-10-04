import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			text: string;
			background: string;
			link: string;
			primary: string;
			secondary: string;
		};
	}
}
