export interface Command<T> {
	readonly name: string
	readonly description: string
	readonly examples: [string, string][]
	execute(state: T | undefined, argument: string[], flags: { [flag: string]: string[] }): Promise<boolean>
}
