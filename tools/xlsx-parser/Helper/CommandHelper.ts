import Commander from "commander"

export default class CommandHelper {
    public static getCommander() {
        return new Commander.Command()
    }

    public static getArgv(command: Commander.Command, name: string) {
        return command[name] ? command[name] : ""
    }

}