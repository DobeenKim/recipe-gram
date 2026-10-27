import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"

const MainLayout = ({children} : {children:React.ReactNode}) => {
    return (
        <>
            <Header />
            <div className="pb-15 md:pb-0">
                {children}
                <MobileNav />
            </div>
        </>
    )
}

export default MainLayout