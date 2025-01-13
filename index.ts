import { Application as paramlyApplication } from "./Application"
import { Command as paramlyCommand } from "./Command"
import { Flag as paramlyFlag } from "./Flag"
import { Module as paramlyModule } from "./Module"

export namespace paramly {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import Application = paramlyApplication
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import Command = paramlyCommand
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import Flag = paramlyFlag
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import Module = paramlyModule
}
