import Link from "next/link"

const AuthLayout = ({children} : {children:React.ReactNode}) => {
    return (
        <div className="w-full py-12 px-6 max-w-[735px] mx-auto">
            <header>
                <Link className="font-medium text-2xl font-serif" href="/">Recipe Gram</Link>
            </header>
            <div>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout