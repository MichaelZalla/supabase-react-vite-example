import React from "react"

import { SupabaseClient, User } from "@supabase/supabase-js"

const useUser = (
	client: SupabaseClient) =>
  {

	const [user, setUser] = React.useState<User|null>(null)

	React.useEffect(
	  () => {

		client.auth.onAuthStateChange((event, session) => {

		  switch(event) {

			case `SIGNED_OUT`:
			  setUser(null)
			  break;

			case `USER_UPDATED`:
			  setUser(session ? session.user : null)
			  break;

			default:
			  // Do nothing
			  break;

		  }

		})

	  },
	  [client]
	)

	React.useEffect(
	  () => {

		client.auth.getUser()
		  .then(res => {

			const {
			  data: {
				user
			  },
			  error,
			} = res

			if(
			  error ||
			  !user
			)
			{
			  setUser(null)

			  return
			}

			setUser(user)

		  })
		  .catch(e => {

			console.error(e)

			setUser(null)

		  })

	  },
	  [client]
	);

	return [user, setUser] as const

  }

export default useUser
