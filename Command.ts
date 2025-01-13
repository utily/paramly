import { isly } from "isly"

export interface Command<T> {
	readonly name: string
	readonly description: string
	readonly examples: [string, string][]
	execute(state: T | undefined, argument: string[], flags: Partial<Record<string, string[]>>): Promise<boolean>
}
export namespace Command {
	export const type = isly.object<Command<any>>(
		{
			name: isly.string(),
			description: isly.string(),
			examples: isly.tuple(isly.string(), isly.string()).array(),
			execute: isly.function(),
		},
		"paramly.Command"
	)
	export const is = type.is
	export const flaw = type.flaw
}
