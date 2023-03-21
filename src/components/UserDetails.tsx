import React from "react";

import { User } from "@supabase/supabase-js";

import UserContext from "../contexts/UserContext";

const UserDetails = () => {

	const user = React.useContext<User|null>(UserContext);

	if(!user) {
	  return <></>
	}

	return (
	  <div id="userDetails">

		<h3>Hi, {user.user_metadata.full_name}</h3>

		<img src={user.user_metadata.avatar_url} alt="User avatar"
			referrerPolicy="no-referrer" />

		{
			import.meta.env.DEV &&
			<p>UID: {user.id}</p>
		}

	  </div>
	)

}

export default UserDetails
