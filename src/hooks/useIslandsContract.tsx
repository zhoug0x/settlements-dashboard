import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';

import islandsAbi from '../abis/islands.json';
import { ISLANDS_ADDRESS } from '../constants';

const useIslandsContract = (): Contract => {
	const { library } = useWeb3React();
	return new Contract(ISLANDS_ADDRESS, islandsAbi, library);
};

export default useIslandsContract;
