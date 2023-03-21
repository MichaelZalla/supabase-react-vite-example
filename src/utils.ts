import { Thing } from './types/collections/thing';

export const sortByWeight = (a: Thing, b: Thing) => a.weight > b.weight ? 1 : -1