import React from "react"

import client from "../client"

const SignInButton = () => {

	const login = React.useCallback(
	  async () => {

		await client.auth.signInWithOAuth({
		  provider: 'google',
		})

	  },
	  []
	)

	return (
	  <button id="signInBtn" className="btn btn-primary" onClick={event => login()}>
		Sign In with Google
	  </button>
	)

}

export default SignInButton
