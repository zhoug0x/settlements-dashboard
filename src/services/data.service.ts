import { Contract } from '@ethersproject/contracts';
import { formatFixed, BigNumber } from '@ethersproject/bignumber';

// Get NFT token ids by address and contract
export const getERC721TokenIds = async (
	address: string,
	contract: Contract
): Promise<string[]> => {
	return new Promise(async (resolve, reject) => {
		// Get address token balance based on the contract
		const balanceResult: string = await contract
			.balanceOf(address)
			.catch((error: any) => {
				reject(error);
			});
		const balance = parseInt(balanceResult) || 0;
		if (balance <= 0) {
			resolve([]);
		}

		// Fetch the token ids
		const promises = [];
		for (let i = 0; i < balance; i++) {
			promises.push(contract.tokenOfOwnerByIndex(address, i));
		}
		const idResults =
			(await Promise.all(promises).catch(error => {
				reject(error);
			})) || [];

		// Parse and resolve results
		const ids = idResults.map((result: BigNumber) => formatFixed(result, '0'));
		resolve(ids);
	});
};
