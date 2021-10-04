import React from 'react';
import Head from 'next/head';

import * as S from './styled';

interface LayoutProps {
	title: string;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
	return (
		<S.ResponsiveContainer>
			<Head>
				<title>{title}</title>
			</Head>
			{children}
			<div style={{ margin: '6rem 0' }}></div>
		</S.ResponsiveContainer>
	);
};

export default Layout;
