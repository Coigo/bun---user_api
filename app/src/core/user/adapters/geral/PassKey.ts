import UseCase from "../../../shared/UseCase";
import type { IPassKey } from "../../domain/PassKey";
import User from "../../domain/User";




export default class MagicLink implements IPassKey {
    
    generateKey() {
        return '123456'
    }
}