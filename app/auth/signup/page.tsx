import Link from "next/link"
import SignUpForm from "./form"

const signupPage = () => {
    return (
        <div className="w-full max-w-[730px] mx-auto">
            <h1 className="categoryText pb-5 pt-11">Sign up page</h1>
            <h2 className="font-serif text-[35px] pb-7">Good food starts here.</h2>
            <SignUpForm />
            <Link className="text-sm text-icon" href="/auth/login">Already have an account?
                <span className="text-point font-semibold cursor-pointer">Log in here!</span>
            </Link>
        </div>
    )
}

export default signupPage