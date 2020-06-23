import * as paramly from "./index"

describe("paramly", () => {
	const application = new paramly.Application("Test", "test", "13.37", [{
		short: "t",
		long: "test",
		arguments: 1,
		description: "test description.",
		usage: "<test name>",
		}], async f => f)
	it("version", async () => {
		let output = ""
		console.log = jest.fn(inputs => output += inputs)
		expect(await application.execute(["version"])).toEqual(true)
		expect(output).toBe("Test\nversion: 13.37\n")
	})
	it("help", async () => {
		let output = ""
		console.log = jest.fn(inputs => output += inputs)
		expect(await application.execute(["help"])).toEqual(true)
		expect(output).toBe(`
Test

UsageTo get started, set a server.
The server with the name default is used by default when no --server flag is used.

 test help <module>	Get help on module

Modules:
help            Shows help.
version         Shows version.
`)
	})
})
