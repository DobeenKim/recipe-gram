import { Heart, House, UserRound } from "lucide-react"
import navIcon from "@/public/button.png"

const MobileNav = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-border flex justify-around items-center z-50 md:hidden">
            <a href="/"><House /></a>
            <a href="/share"><Heart /></a>
            <a href="/create"><img src={navIcon.src} alt="posting icon" className="w-8 h-8" /></a>
            <a  href="/profile"><UserRound /></a>
            
        </nav>
    )
}
export default MobileNav