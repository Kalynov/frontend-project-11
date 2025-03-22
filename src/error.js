import { TYPES } from "./constants.js"


export const getError = (type) => {
    switch (type) {
        case TYPES.dublicate: {
            return 'DublicateError'
        }
        case TYPES.responceError: {
            return 'ResponceError'
        }
        default: {
            return 'UnknownError'
        }
    }
} 