'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { slugify } from "@/lib/supabase/slugify"
import { uploadImage } from "@/lib/supabase/upload-image"


export const EditPost = async({postdata, postId} : {postdata:z.infer<typeof postSchema>, postId: string}) => {
    const parsedData = postSchema.parse(postdata)
    const supabase = await createClient()

    const imageFile = postdata.image?.get('image')

    const {data:post, error} = await supabase.from("recipe_posts").select("*").eq("id", postId).single()
    if(!post) throw new Error("Post doesn't exist")

    let imageUrl;

    console.log("Type:", typeof imageFile)

    if(typeof imageFile !== "undefined") {
        if(!(imageFile instanceof File) && imageFile !== null) {
            throw Error ( "image is not in a valid format")
        }

        imageUrl = imageFile ? await uploadImage(imageFile) : null
    } else {
        imageUrl = post.image
    }

    const {data: updatedPost} = await supabase.from("recipe_posts").update({...parsedData, image:imageUrl})
        .eq("id", postId).select("slug").single().throwOnError()

    revalidatePath("/")
    redirect(`/${updatedPost.slug}`)
}