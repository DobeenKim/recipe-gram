'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"


export const DeletCommentAction = async(commentId : string) => {
    const supabase = await createClient()

    const {data,error} = await supabase.from("Comments").delete().eq("id", commentId)
    console.log("Error :", error, "Data", data)

    revalidatePath("/")
}