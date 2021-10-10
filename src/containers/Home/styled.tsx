import styled from 'styled-components';

export const Wrapper = styled.div`
	text-align: center;
`;

export const Title = styled.h1`
	font-size: 4rem;
	color: ${({ theme }) => theme.colors.primary};
	letter-spacing: -0.06em;
	margin: 2rem 0 1rem 0;
`;

export const Description = styled.div`
	font-size: 0.75rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.secondary};
`;

export const WalletControls = styled.div`
	margin-top: 1rem;
`;

export const Button = styled.button`
	cursor: pointer;
	border: none;
	padding: 0.5em 1em;
	font-size: 1rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.background};
	background: ${({ theme }) => theme.colors.primary};
	margin-bottom: 1rem;
	box-shadow: 0px 10px 20px -5px rgb(0, 0, 0, 0.25);

	&:active,
	&:focus {
		outline: none;
	}

	&:hover {
		opacity: 0.85;
	}
`;

export const WalletData = styled.div`
	margin: 1rem 0;
	font-size: 0.75rem;
	font-style: italic;
`;
