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

				let things = data ? data : []

				things.sort((a, b) => a.weight > b.weight ? -1 : 1)

				setThings(things ? (things as Thing[]) : [])

			})

		},
		[client, setThings]
	)

	return [things, setThings] as const

  }

export default useThings
