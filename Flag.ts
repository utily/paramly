import { isly } from "isly"

export interface Flag {
	short?: string
	long: string
	arguments?: number
	description: string
	usage: string
}
export namespace Flag {
	export const type = isly.object<Flag>(
		{
			short: isly.string().optional(),
			long: isly.string(),
			arguments: isly.number().optional(),
			description: isly.string(),
			usage: isly.string(),
		},
		"paramly.Flag"
	)
	export const is = type.is
	export const flaw = type.flaw
}
