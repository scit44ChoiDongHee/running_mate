export type SignInCredential = {
    user_id: string
    user_pw: string
}

export type SignInResponse = {
    token: string
    user: {
        user_id: string
        authority: string[]
        avatar: string
        user_email: string
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    user_id: string
    user_email: string
    user_name: string
    user_pw: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    user_pw: string
}
