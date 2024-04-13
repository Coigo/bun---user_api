import UseCase from "../../../shared/UseCase";
import type { IMagicLink } from "../../domain/MagicLink";
import User from "../../domain/User";




export default class MagicLink implements IMagicLink {
    
    generateUUID () {
        return crypto.randomUUID()
    }
}