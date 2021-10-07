import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';

const useContract = (address: string, abi: any) => {
	const { library } = useWeb3React();
	return { contract: new Contract(address, abi, library) };
};

export default useContract;
