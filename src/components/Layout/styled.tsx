import styled from 'styled-components';

export const ResponsiveContainer = styled.div`
	width: 100%;
	padding-right: 2rem;
	padding-left: 2rem;
	margin-right: auto;
	margin-left: auto;

	@media (min-width: 576px) {
		max-width: 540px;
	}

	@media (min-width: 768px) {
		max-width: 720px;
	}

	@media (min-width: 992px) {
		max-width: 960px;
	}

	@media (min-width: 1200px) {
		max-width: 1140px;
	}
`;
