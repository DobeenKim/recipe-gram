'use client'

import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {LogIn} from '@/action/login-action'
import { loginSchema } from '@/action/schemas'
import ErrorMessage from '@/components/ErrorMessage'
import { useMutation } from '@tanstack/react-query'

const LoginForm = () => {

    const { register,handleSubmit, formState: {errors} } = useForm({
        resolver:zodResolver(loginSchema)
    })
    
    const {mutate, error, isPending} = useMutation({
        mutationFn: LogIn
    })

    return (
        <div>
            <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col gap-7 boldText">
                <div className="flex flex-col gap-2">
                    <label className="pl-1 boldText" htmlFor="email">Email</label>
                    <input className="border" {...register("email")} placeholder="Email ..." />
                    {errors.email && <ErrorMessage error={errors.email.message!} />}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="pl-1" htmlFor="password">Password</label>
                    <input className="border" {...register("password")} placeholder="Password..." />
                    {errors.password && <ErrorMessage error={errors.password.message!} />}
                </div>
                <button
                className="button-signUp mb-[38px]">
                    {isPending ? "Logging in" : "Log In"}
                </button>
                {error &&  <ErrorMessage error={error.message} />}
            </form>
        </div>
    )
}

export default LoginForm