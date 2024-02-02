export type linkToken = string

export interface MagicLink {
    generateUUID: () => linkToken
}