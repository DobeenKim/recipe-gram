import Link from "next/link"
import LoginForm from "./form"

const LoginPage = () => {
    return (
        <div className="w-full max-w-[730px] mx-auto">
            <h1 className="categoryText pb-5 pt-11">wlcome to the table</h1>
            <h2 className="font-serif text-[35px] pb-7">Good food starts here.</h2>
            <p className="ptagText pb-9">Sign in to discover recipes from home cooks.</p>
            <LoginForm />
            <Link className="text-sm text-icon" href="/auth/signup">Don't you have an account yet?  
                <span className="text-point font-semibold cursor-pointer"> Sign up here!</span>
            </Link>
        </div>
    )
}

export default LoginPage