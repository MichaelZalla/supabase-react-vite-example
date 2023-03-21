import React from "react"

import { User } from "@supabase/supabase-js"

const UserContext = React.createContext<User|null>(null)

export default UserContext
