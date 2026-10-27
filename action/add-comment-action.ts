'use server'
import { createClient } from "@/lib/supabase/serverClient"
import { commentSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"


export const AddCommentAction = async({commentdata, postId}: {commentdata: z.infer<typeof commentSchema>, postId:string}) => {
    const supabase = await createClient()
    const parsedData = commentSchema.parse(commentdata)

    const {data : {user}} = await supabase.auth.getUser()
    if(!user) throw new Error ("Unauthorized access")

    await supabase.from("Comments")
    .insert({postid : postId, userid:user.id, ...parsedData})
    .throwOnError()

    revalidatePath("/")
}