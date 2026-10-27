'use client'

import { signUpSchema } from "@/action/schemas"
import { SignUp } from "@/action/signup-action"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"



const SignUpForm = () => {

    const { register,handleSubmit, formState: {errors} } = useForm({
            resolver:zodResolver(signUpSchema)
        })

        const {mutate, error, isPending} = useMutation({
        mutationFn: SignUp
    })

    return (
        <div>
            <form onSubmit={handleSubmit(values => mutate(values))}  className="flex flex-col boldText">
                <div className="flex flex-col gap-2 mb-7">
                    <label className="pl-1 boldText" htmlFor="username">Username</label>
                    <input className="border" {...register("username")} placeholder="Username ..."></input>
                    {errors.username && <ErrorMessage error={errors.username.message!} />}
                </div>
                <div className="flex flex-col gap-2 mb-7">
                    <label className="pl-1 boldText" htmlFor="email">Email</label>
                    <input className="border" {...register("email")} placeholder="Email ..."></input>
                    {errors.email && <ErrorMessage error={errors.email.message!} />}
                </div>
                <div className="flex flex-col gap-2 pb-4">
                    <label className="pl-1 boldText" htmlFor="password">Password</label>
                    <input className="border" {...register("password")} placeholder="password ..." type="password"></input>
                    {errors.password && <ErrorMessage error={errors.password.message!} />}
                </div>
                <button className="button-signUp mb-[38px]">Sign Up</button>
                {error && <ErrorMessage error={error.message} />}
            </form>
        </div>
    )
}

export default SignUpForm


