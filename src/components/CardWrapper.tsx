import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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

const CardWrapper: React.FC = ({ children }) => <Wrapper>{children}</Wrapper>;

export default CardWrapper;
