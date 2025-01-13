import { paramly } from "./index"

describe("paramly.Flag", () => {
	it.each([
		{
			short: "s",
			long: "server",
			arguments: 1,
			description: "Base URL of server to connect to.",
			usage: "<url>",
		},
	])("is(%s)", value => expect(paramly.Flag.is(value)).toBe(true))
})
