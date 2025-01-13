import { isly } from "isly"
import { Command } from "./Command"

export interface Module<T> {
	readonly name: string
	readonly description: string
	readonly commands: Partial<Record<string, Command<T>>>
}
export namespace Module {
	export const type = isly.object<Module<any>>(
		{
			name: isly.string(),
			description: isly.string(),
			commands: isly.record(isly.string(), Command.type.optional()),
		},
		"paramly.Module"
	)
}
