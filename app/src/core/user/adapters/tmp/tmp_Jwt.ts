import { JwtProvider } from "../../domain/Jwt";
import User from "../../domain/User";

export default class Jwt implements JwtProvider {

    public sign ( toSign: User ) {
        return 'jwt'
    }

}