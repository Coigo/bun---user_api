
import { CryptoPassword } from "../domain/CryptoPasswordProvider";

export default class Crypto implements CryptoPassword {

    public async encrypt (password: string) {
        const hash = Bun.password.hash( password, {
            algorithm:'argon2d',
            memoryCost: 4, 
            timeCost: 3
        })
        return hash
        
        
    }

    public async compare (password: string, hash: string) {
        return Bun.password.verify(password, hash)
    };

}