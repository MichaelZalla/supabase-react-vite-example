import React from "react"

import client from "../client"

const SignOutButton = () => {

	const logout = React.useCallback(
	  async () => {

		const { error } = await client.auth.signOut()

		if(error) {
		console.error(error)
		}

	  },
	  []
	)

	return (
	  <button id="signOutBtn" className="btn btn-primary" onClick={(e) => logout()}>
		Sign Out
	  </button>
	)

}

export default SignOutButton
