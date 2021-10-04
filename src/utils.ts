import type { BigNumberish } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';

export const parseBalance = (value: BigNumberish, decimals = 18): number =>
	parseFloat(formatUnits(value, decimals));

export const toBalanceString = (value: number): string => {
	return value.toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};
