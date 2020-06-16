import { Module } from "./Module"

export class Application<T> {
    private readonly modules: { [name: string]: Module<T> } = {}
    constructor(label: string, name: string, version: string, private readonly flags: { [name: string]: number }, private readonly createState: (flags: { [name: string]: number }) => Promise<T | undefined>) {
		this.register({
			name: "help",
			description: "Shows help.",
			commands: {
				_: {
					name: "_",
					description: "Runs help",
					examples: [
						["", "Shows module overview."],
						["<module>", "Shows help for specific module."],
						["<module> <command>", "Shows help for specific command."],
					],
					execute: async (state, argument, _) => {
						const module = argument.length > 0 && this.modules[argument[0]]
						const command = module && argument.length > 1 && module.commands[argument[1]]
						console.log(`\n${ label }\n\nUsage`)
						if (command && module)
							console.log(`${ name } ${ module.name } ${ command.name } <command>\n\n${ command.description }\n\nExamples:\n${ command.examples.map(example => `${ example.join("\t") }`).join("\n") }\n`)
						else if (module) {
							if (module.commands._)
								console.log(`${ name } ${ module.name }\t${ module.commands._.description }`)
							const commands = [...new Set(Object.values(module.commands))].filter(c => c?.name != "_")
							if (commands.length > 0)
								console.log(`${ name } ${ module.name } <command>\t\tRun command\npayfunc help ${ module.name } <command>\tGet help on command\n\nCommands:\n${ commands.map(c => `${ c?.name.padEnd(10, " ") }\t${ c?.description }`).join("\n") }\n`)
							else 
								console.log(`${ name } help ${ module.name }\tGet help on ${ module.name }.\n`)
						} else
							console.log(`To get started, set a server.\nThe server with the name default is used by default when no --server flag is used.\n\n ${ name } help <module>\tGet help on module\n\nModules:\n${ [...new Set(Object.values(this.modules))].map(m => `${ m?.name.padEnd(16, " ")}${ m?.description.padStart(6, " ")}`).join("\n") }\n`)
						return true
					},
				},
			}
		}, "help", "h", "?")
		this.register({
			name: "version",
			description: "Shows version.",
			commands: {
				_: {
					name: "_",
					description: "Show version.",
					examples: [],
					execute: async (connection, argument, _) => {
						console.log(`${ label }\n version: ${ version } + \n`)
						return true
					},
				}
			}
		}, "version", "v")
    }
	async execute(argument: string[]): Promise<boolean> {
		let a: string[] = []
		const f: { [flag: string]: string[] } = {}
		let item: string | undefined
		while (item = argument.shift()) {
			if (item.startsWith("-")) {
				while (item.startsWith("-"))
					item = item.slice(1)
				f[item] = argument.splice(0, this.flags[item])
			} else
				a.push(item)
		}
		const state = await this.createState(this.flags)
		const module = this.modules[a.shift() ?? "?"] ?? this.modules["?"]
		const commandName = a.shift()
		let command = module.commands[commandName ?? "_"]
		if (!command) {
			command = module.commands._
			a = commandName ? [commandName, ...a] : a
		}
		return await command?.execute(state, a, f) || false
	}
	async run(argument: string[]): Promise<boolean> {
		const result = await this.execute(argument.slice(2))
		console.log(result ? "succeeded" : "failed")
		return result
	}
	register(module: Module<T>, ...names: string[]): void {
		names.forEach(name => this.modules[name] = module)
	}
}
