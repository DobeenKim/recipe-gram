import { CirclePlus, Heart, House } from "lucide-react"
import navIcon from "@/public/navIcon.png"

const MobileNav = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-border flex justify-around items-center z-50 md:hidden">
            <a href="/"><House /></a>
            <a href="/create"><img src={navIcon.src} alt="posting icon" className="w-9 h-9" /></a>
            <a href="/share"><Heart /></a>
            
        </nav>
    )
}
export default MobileNav