import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';

import shipsAbi from '../abis/ships.json';
import shipsHelperAbi from '../abis/ships-helper.json';
import { SHIPS_ADDRESS, SHIPS_HELPER_ADDRESS } from '../constants';

const useShipsContract = (): {
	shipsContract: Contract;
	shipsHelperContract: Contract;
} => {
	const { library } = useWeb3React();
	const shipsContract = new Contract(SHIPS_ADDRESS, shipsAbi, library);
	const shipsHelperContract = new Contract(
		SHIPS_HELPER_ADDRESS,
		shipsHelperAbi,
		library
	);
	return { shipsContract, shipsHelperContract };
};

export default useShipsContract;
