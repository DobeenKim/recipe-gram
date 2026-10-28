import Link from "next/link"
import AccountLink from "./accountLink"
import icon from "@/public/crumb-logo-mark.svg"

const Header = () => {
    return (
        <>
        <header className="w-full px-3 lg:px-0 md:px-4 mt-4 max-w-[790px] md:mx-auto">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <img src={icon.src} alt="logo img" className="h-9 w-auto"></img>
                    <Link className="font-medium text-2xl font-serif cursor-pointer" href="/">Gramy</Link>
                </div>
                <AccountLink />
            </div>
        </header>
        <span className="border-b border-border w-full pt-4"></span>
        </>
    )
}

export default Header