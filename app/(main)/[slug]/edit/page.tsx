import { getSinglePost } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import EditPageForm from "./form"


const EditPostPage = async({params}:{params: {slug:string}}) => {
    const {slug} = await params

    const supabase =  await createClient()
    const {data: {user}} = await supabase.auth.getUser()

    const {data, error} = await getSinglePost(slug)
    if (user && data && user.id !== data.author.id )
        redirect("/")

    return (
        <>
            {data &&
                <div className="px-4 py-4 max-w-[730px] md:mx-auto">
                    <h1> Edit: {data.title} </h1>
                    <EditPageForm initialValues={{title:data.title, content: data.content, image:data.image, category:data.category,ingredient:data.ingredient}} postId={data.id} />
                </div>
            } 
        </>
    )
}

export default EditPostPage