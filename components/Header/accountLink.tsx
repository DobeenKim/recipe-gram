import { Logout } from "@/action/logout-action"
import { createClient } from "@/lib/supabase/serverClient"
import Link from "next/link"
import { Plus, LogOut, Heart, UserRound} from "lucide-react"
import Profile from "@/app/(main)/profile/page"

const AccountLink = async() => {
    const supabase = await createClient()
    const {data:{user}, error} = await supabase.auth.getUser()
    return (
        <div>
            <div className="flex justify-between gap-3 md:gap-[30px] items-center">
                {user ?
                <>
                    <Link href="/create" className="xsText flex gap-[11px] share-button cursor-pointer"><Plus className="w-4 h-4"/>Share recipe</Link>
                    <Link href= "/share" className="hidden md:flex md:cursor-pointer md:flex-row text-sm items-center gap-2 hover:bg-[#CCE7C8] p-2 rounded-md"><Heart /> Saved</Link>
                    <Link href="/profile"  className="hidden md:flex md:cursor-pointer md:flex-row text-sm items-center gap-2  hover:bg-[#CCE7C8] p-2 rounded-md"><UserRound />Profile</Link>
                    <div onClick={Logout} className="flex justify-between items-center cursor-pointer"><LogOut className="h-5 w-5 "/></div>
                </>
                :
                <>
                    <Link href="/auth/login" className="cursor-pointer">Log In</Link>
                    <Link href="/auth/signup" className="share-button cursor-pointer">Sign up</Link>
                </>
                }
            </div>
        </div>
    )
}

export default AccountLink