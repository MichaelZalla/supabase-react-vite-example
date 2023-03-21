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

	return [things, setThings] as const

  }

export default useThings
