import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';

import settlementsAbi from '../abis/settlements.json';
import { SETTLEMENTS_ADDRESS } from '../constants';

const useSettlementsContract = (): Contract => {
	const { library } = useWeb3React();
	return new Contract(SETTLEMENTS_ADDRESS, settlementsAbi, library);
};

export default useSettlementsContract;
