import React from "react"

import { SupabaseClient } from "@supabase/supabase-js"

import { Thing } from "../types/collections/thing"

import { sortByWeight } from "../utils"

const useThings = (
	client: SupabaseClient) =>
  {

	const [things, setThings] = React.useState<Thing[]>([])

	const setThingsSorted = React.useCallback(
		(things: Thing[]) => {

			things.sort(sortByWeight)

			return setThings(things)

		},
		[setThings]
	)

	React.useEffect(
		() => {

			client.from('things')
			.select()
			.then(res => {

				const { data, error } = res

				let things = data ? (data as Thing[]) : []

				setThingsSorted(things ? (things as Thing[]) : [])

			})

		},
		[client, setThingsSorted]
	)

	React.useEffect(
		() => {

			const subscription = client
				.channel(`public:things`)
				.on(`postgres_changes`, { event: '*', schema: 'public', table: 'things' }, (payload) => {

					switch(payload.eventType) {
						case `INSERT`:

							const newThing = payload.new as Thing

							const newThings = [
								...things,
								newThing,
							]

							// @TODO(mzalla) Race conditions
							setThingsSorted(newThings)

							return;

						case `UPDATE`:

							const updatedThing = payload.new as Thing

							const updatedThings = things.map(thing =>
								(thing.id === updatedThing.id) ?
									updatedThing :
									thing
							)

							// @TODO(mzalla) Race conditions
							setThingsSorted(updatedThings)

							return;

						case `DELETE`:

							const { id } = payload.old as Thing

							const remainingThings = things.filter(thing => {
								return thing.id !== id
							})

							// @TODO(mzalla) Race conditions
							setThingsSorted(remainingThings)

							return;

						default:
							// Impossible?!
							break;
					}

				})
				.subscribe()

			return () => {
				subscription.unsubscribe()
			}

		},
		[things, setThingsSorted]
	)

	return [things, setThings] as const

  }

export default useThings
