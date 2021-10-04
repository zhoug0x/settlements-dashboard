import Trait from './Trait';

interface Island {
	id: string;
	traits: {
		rss: Trait;
		climate: Trait;
		terrain: Trait;
	};
	size: number;
	pop: number;
	maxPop: number;
	taxRate: number;
	rssBal: number;
}

export default Island;
