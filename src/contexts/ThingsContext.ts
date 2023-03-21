import React from "react"

import { Thing } from "../types/collections/thing"

export type ThingsContextProviderType = [
	Thing[],
	React.Dispatch<React.SetStateAction<Thing[]>>
]

const ThingsContext = React.createContext<ThingsContextProviderType>([
	[],
	() => {}
])

export default ThingsContext
