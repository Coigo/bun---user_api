import { error } from "./core/shared/Errors"

export function validate ( data: any, requireds: any[] ) {

    const errors: error[] = []

    for ( const required of requireds ){
        if ( !data[required] ) {
            errors.push({
                message: `${required} not provided.`,
                code: 400
            })
        }
    }

    return {
        valid: errors.length === 0,
        errors
    }

    

}