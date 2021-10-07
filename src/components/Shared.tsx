import styled from 'styled-components';

export const Heading = styled.div`
	font-size: 3.5rem;
	letter-spacing: -0.05em;
	margin: 3rem 0 2rem 0;
`;

export const CardGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

export const CardWrapper = styled.div`
	border: 2px solid #666;
	padding: 0.5rem;
	margin: 0 1rem 1rem 0;
	width: 16rem;
	text-align: left;
	box-shadow: 0px 10px 20px -5px rgb(0, 0, 0, 0.25);

	&:hover {
		cursor: pointer;
		opacity: 0.8;
		box-shadow: 0px 10px 20px -5px rgb(0, 0, 0, 0.5);
	}

	& > a {
		color: inherit;
	}
`;
