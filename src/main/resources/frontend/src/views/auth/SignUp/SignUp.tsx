import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">회원가입</h3>
                <p>RunningMate에 가입해서 당신의 목표 실현에 다가가세요.</p>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
