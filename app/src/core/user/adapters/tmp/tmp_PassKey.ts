import { IPassKey } from "../../domain/PassKey"

export default class PassKey implements IPassKey {

    public generateKey () {
        return '123456'
    }

}