import React from "react"

import { SupabaseClient } from "@supabase/supabase-js"

import { Thing } from "../types/collections/thing"

const useThings = (
	client: SupabaseClient) =>
  {

	const [things, setThings] = React.useState<Thing[]>([])

	React.useEffect(
		() => {

			client.from('things')
			.select()
			.then(res => {

				const { data, error } = res

				let things = data ? (data as Thing[]) : []

				setThings(things)

			})

		},
		[client, setThings]
	)

	React.useEffect(
		() => {

			const subscription = client
				.channel(`public:things`)
				.on(`postgres_changes`, { event: '*', schema: 'public', table: 'things' }, (payload) => {

					switch(payload.eventType) {
						case `INSERT`:

							const newThing = payload.new as Thing

							setThings(things => {

								// Make sure this wasn't a thing that our client
								// has already added to `things[]`

								const matchingThings = things
									.filter(thing => thing.id === newThing.id)

								if(matchingThings.length) {
									return things;
								}

								return [
									...things,
									newThing,
								]

							})

							return;

						case `UPDATE`:

							const updatedThing = payload.new as Thing

							setThings(
								things => things.map(thing =>
									(thing.id === updatedThing.id) ?
										updatedThing :
										thing
								)
							)

							return;

						case `DELETE`:

							const { id } = payload.old as Thing

							setThings(
								things => things.filter(thing => thing.id !== id)
							)

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
		[things, setThings]
	)

	return [things, setThings] as const

  }

export default useThings
