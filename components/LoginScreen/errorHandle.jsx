import { errorCode } from "../../util/constants"

export const errorHandle = (eCode) => {
    console.log(eCode)
    if (eCode === errorCode.invalidEmail) {
        return "This email is not registered"
    }
    else if (eCode === errorCode.wrongPassword) {
        return "Wrong password"
    }
}