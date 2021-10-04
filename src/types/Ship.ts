interface Resource {
	name: string;
	balance: number;
}

interface Ship {
	id: string;
	name: string;
	expedition: string;
	length: number;
	speed: number;
	status: any; // TODO: make type-safe
	blocksUntilNext: number;
	route: any[]; // TODO: make type-safe
	rssBals: Resource[];
}

export default Ship;
