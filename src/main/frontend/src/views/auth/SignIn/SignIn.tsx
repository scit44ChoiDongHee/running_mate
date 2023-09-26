import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">환영합니다!</h3>
                <p>아이디와 비밀번호를 입력하세요!</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
