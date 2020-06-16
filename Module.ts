import { Command } from "./Command"
import * as configuration from "./package.json"

export interface Module<T> {
	readonly name: string
	readonly description: string
	readonly commands: { [command: string]: Command<T> | undefined }
}
