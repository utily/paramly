import { Command } from "./Command"

export interface Module<T> {
	readonly name: string
	readonly description: string
	readonly commands: { [command: string]: Command<T> | undefined }
}
