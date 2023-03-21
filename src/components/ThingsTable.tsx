import { Thing } from "../types/collections/thing";

type ThingsTableProps = {
	things: Thing[];
}

const ThingsTable = ({ things }: ThingsTableProps) => {

	return (
		<table className='table table-striped'>
			<thead>
			<tr>
				<th>Name</th>
				<th>Weight</th>
			</tr>
			</thead>
			<tbody>
			{
				things.map(thing => (
				<tr key={thing.id}>
					<td>{thing.name}</td>
					<td>{thing.weight} lb{ thing.weight === 1 ? `` : `s` }.</td>
				</tr>
				))
			}
			</tbody>
		</table>
	)

}

export default ThingsTable
