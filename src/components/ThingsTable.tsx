import React from "react";

import { User } from "@supabase/supabase-js";

import { Thing } from "../types/collections/thing";

import client from "../client";

type ThingsTableProps = {
	things: Thing[];
	user?: User;
}

const ThingsTable = ({ things, user }: ThingsTableProps) => {

	const deleteThing = React.useCallback(
		async (id: number) => {
			return client.from('things').delete().eq('id', id)
		},
		[]
	)

	return (
		<table className='table table-striped'>
			<thead>
			<tr>
				<th>Name</th>
				<th>Weight</th>
				{
					user &&
					<th>
						{/* Delete icon */}
					</th>
				}
			</tr>
			</thead>
			<tbody>
			{
				things.map(thing => (
				<tr key={thing.id}>
					<td>{thing.name}</td>
					<td>{thing.weight} lb{ thing.weight === 1 ? `` : `s` }.</td>
					{
						user &&
						<td>
							<button className="btn btn-sm btn-danger" type="button" role="button"
								onClick={e => deleteThing(thing.id)}>
								Delete
							</button>
						</td>
					}
				</tr>
				))
			}
			</tbody>
		</table>
	)

}

export default ThingsTable
