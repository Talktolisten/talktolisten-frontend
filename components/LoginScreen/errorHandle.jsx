import { errorCode } from "../../util/constants"

export const errorHandle = (eCode) => {
    if (eCode === errorCode.invalidEmail) {
        return "This email is not valid"
    }
    else if (eCode === errorCode.wrongPassword) {
        return "Wrong password"
    }
    else if (eCode === errorCode.weakPassword) {
        return "Password must have at least 6 characters"
    }
    else if (eCode === errorCode.emailExists) {
        return "This email is already registered"
    }
    else if (eCode === errorCode.missingPassword) {
        return "Please enter your password"
    }
    else if (eCode === errorCode.requiresRecentLogin) {
        return "Please verify your email"
    }
    else if (eCode === "not-agree") {
        return "Please agree to the terms and conditions"
    }
}