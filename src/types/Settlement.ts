import Trait from './Trait';

interface Settlement {
	id: string;
	traits: {
		size: Trait;
		spirit: Trait;
		age: Trait;
		rss: Trait;
		morale: Trait;
		gov: Trait;
		realm: Trait;
	};
	rssBal: number;
}

export default Settlement;
