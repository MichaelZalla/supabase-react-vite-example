type ForeignKey = string

export type Thing = {
	id: number;
	owner: ForeignKey;
	name: string;
	weight: number;
}
