import { User } from '@supabase/supabase-js';

import { faker } from '@faker-js/faker';

import { Thing } from './types/collections/thing';

export const makeRandomThing = (
	user: User): Omit<Thing, `id`> =>
{
	return {
		owner: user.id,
		name: faker.commerce.productName(),
		weight: Math.round(Math.random() * 100),
	}
}

export const sortByWeight = (
	a: Thing,
	b: Thing): -1|0|1 =>
{
	return (a.weight > b.weight) ? 1 : -1
}
