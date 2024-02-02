import UseCase from "../../../shared/UseCase";
import User from "../../domain/User";




export default class MagicLink {
    
    generateUUID () {
        return crypto.randomUUID()
    }
}