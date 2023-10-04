import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    user_id: string
    user_pw: string
    user_name: string
    user_email: string
}

const validationSchema = Yup.object().shape({
    user_id: Yup.string().required('Please enter your user id'),
    user_email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
    user_name: Yup.string().required('Please enter your user name'),
    user_pw: Yup.string().required('Please enter your user_password'),
    confirmuser_pw: Yup.string().oneOf(
        [Yup.ref('user_pw')],
        'Your user_passwords do not match'
    ),
})

const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { user_id, user_pw, user_name, user_email } = values
        console.log(values)

        setSubmitting(true)
        const result = await signUp({
            user_id,
            user_pw,
            user_name,
            user_email,
        })

        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    user_id: '',
                    user_pw: '',
                    confirmuser_pw: '',
                    user_name: '',
                    user_email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="아이디"
                                invalid={errors.user_id && touched.user_id}
                                errorMessage={errors.user_id}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="user_id"
                                    placeholder="아이디 입력"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="이메일"
                                invalid={
                                    errors.user_email && touched.user_email
                                }
                                errorMessage={errors.user_email}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="user_email"
                                    placeholder="이메일 입력"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="비밀번호"
                                invalid={errors.user_pw && touched.user_pw}
                                errorMessage={errors.user_pw}
                            >
                                <Field
                                    type="password"
                                    autoComplete="off"
                                    name="user_pw"
                                    placeholder="비밀번호"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                label="비밀번호 확인"
                                invalid={
                                    errors.confirmuser_pw &&
                                    touched.confirmuser_pw
                                }
                                errorMessage={errors.confirmuser_pw}
                            >
                                <Field
                                    type="password"
                                    autoComplete="off"
                                    name="confirmuser_pw"
                                    placeholder="비밀번호 확인"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                label="사용자 이름"
                                invalid={errors.user_name && touched.user_name}
                                errorMessage={errors.user_name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="user_name"
                                    placeholder="사용자 이름"
                                    component={Input}
                                />
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Sign Up'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>계정을 이미 보유하고 계신가요?</span>
                                <ActionLink to={signInUrl}>로그인</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
