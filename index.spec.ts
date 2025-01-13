import { paramly } from "./index"

describe("paramly", () => {
	const application = new paramly.Application(
		"Test",
		"test",
		"13.37",
		[
			{
				short: "s",
				long: "server",
				arguments: 1,
				description: "Base URL of server to connect to.",
				usage: "<url>",
			},
			{
				short: "v",
				long: "verbose",
				description: "More verbose output.",
				usage: "",
			},
		],
		async f => f
	)
	application.register(
		{
			name: "output",
			description: "Show argument in output.",
			commands: {
				list: {
					name: "list",
					description: "List output.",
					examples: [
						["all", "List all output."],
						["", "List some output."],
					],
					async execute(state, argument, flags) {
						console.log("output", argument, flags, state)
						return false
					},
				},
			},
		},
		"output",
		"o"
	)
	it.each([
		"output all --server https://example.com",
		"--verbose",
		"version",
		"unknown",
		"unknown 42",
		"help",
		"help output",
		"help output list",
		"help output list --server",
		"help --server",
		"help version",
		"help unknown",
	])("%s", async argument => {
		let output = ""
		console.log = vi.fn(inputs => (output += inputs))
		expect(await application.run(["node", "test", ...argument.split(" ")])).toEqual(argument.slice(0, 6) != "output")
		expect(output).toMatchSnapshot()
	})
})
