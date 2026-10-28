'use client'
import { Logout } from "@/action/logout-action"
import { createClient } from "@/lib/supabase/browserClient"
import { LogIn, Utensils } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const Profile = () => {
    const [user, setUser] = useState<any>(null)
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const supabase = createClient()

    useEffect(() => {
        const fetchUserProfile = async() => {
            const {data: {user} } = await supabase.auth.getUser()

            if(user) {
                setUser(user)
                if(user.email) {
                    setEmail(user.email)
                }
                const {data, error} = await supabase
                .from('Profiles')
                .select('username')
                .eq('id', user.id)
                .single()

                if(data && data.username) {
                    setUsername(data.username)
                }
            }
        }
        fetchUserProfile()
    }, [supabase])
    return(
        <div className="max-w-[730px] mx-auto px-4 mt-8">
            <div className="bg-white border border-border-gray rounded-xl shadow-md !px-9.5 !py-8 lg:!py-30.5 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-point text-white flex items-center justify-center text-3xl font-bold mb-4 mx-auto">
                    <Utensils color="#ffffff"  />
                </div>
                <div className="w-full max-w-[300px] mx-auto flex flex-col items-center">
                    <p className="categoryText text-point font-semibold text-xs tracking-wider mb-1">WELCOME BACK</p>
                    <h2 className="text-[32px] font-bold text-gray-900 mb-2">Hello, @{username || "Guest"}!</h2>
                    <p className="text-gray-500 text-sm mb-6">Good to see you in the kitchen. What are we cooking today?</p>
                    <div className="w-full bg-[#F4F1EA] rounded-xl p-4 flex flex-col items-start text-left gap-0.5 mb-6">
                        <span className="text-xs text-gray-500">Signed in as</span>
                        <span className="text-sm font-medium text-gray-800">{email}</span>
                    </div>
                    {user ? 
                        <> 
                        <button onClick={Logout} className="border border-border-gray px-6 py-2.5 rounded-xl text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium">
                            <span className="cursor-pointer" >Log out</span>
                        </button>
                        </>
                        :   
                        <>
                        <p className="ptagText2">Please log in or sign up to view your profile.</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile