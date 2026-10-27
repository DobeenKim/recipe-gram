'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { slugify } from "@/lib/supabase/slugify"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { uploadImage } from "@/lib/supabase/upload-image"

export const CreatePost = async (postdata: z.infer<typeof postSchema>) => {
    const parsedData = postSchema.parse(postdata)

    const supabase = await createClient()
    const {data : {user}} = await supabase.auth.getUser()

    if(!user) throw new Error ("Unauthorized access")
    
    const slug = slugify(parsedData.title)

    const imageFile = postdata.image?.get('image')

    if(!(imageFile instanceof File) && imageFile !== null && imageFile !== "undefined") {
        throw Error ( "image is not in a valid format")
    }

    const imageUrl = (imageFile &&  imageFile !== "undefined") ? await uploadImage(imageFile) : null

    const { error } = await supabase.from("recipe_posts").insert([
        {
            ...parsedData,
            image: imageUrl,
            slug: slug,
            author: user.id,
        }
    ])

    if(error) console.log(error)
        revalidatePath("/")
        redirect(`/${slug}`)
}
