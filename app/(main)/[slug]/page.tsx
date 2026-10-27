import { getSinglePost } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import DeleteButton from "./deleteButton"
import Link from "next/link"
import Comments from "./comments"
import AddComment from "./addComment"

const PostPage = async({params}:{params: {slug:string}}) => {
    const {slug} = await params
    const supabase = await createClient()
    const { data: {user} } = await supabase.auth.getUser()
    
    const {data, error} = await getSinglePost(slug)
    const isAuthor:boolean = user && data && user.id === data.author.id ? true : false  

    return (
        <div className="max-w-[790px] mx-auto pt-5"> 
            {data && 
                <div className="lg:flex lg: flex-row lg:gap-4 justify-center"> 
                    <div className="w-full">
                        <div className="w-full max-w-[500px] md:px-4 lg:px-0 lg:mx-auto">{data.image && 
                            <img src={data.image} alt={data.title} className="w-full object-cover md:mx-0"/>}
                        </div>
                        <div className="flex flex-col gap-[17px] pt-[5px] px-4 lg:px-5 w-full"> 
                            <p className="categoryText">{data.category}</p>
                            <h2 className="titleText break-words">{data.title}</h2>
                            <p className="ptagText2 font-bold">Recipe by @{data.author.username}</p>
                            {data.content && <p className="break-words ">{data.content}</p>}
                            <div className="ptagText2 pb-7 flex flex-col gap-[17px]"> 
                                {isAuthor &&
                                    <div className="flex flex-row gap-[6px]"> 
                                        <DeleteButton id={data.id} />
                                        <Link href={`/${slug}/edit`} className="delete-button">Edit Post</Link>
                                    </div> 
                                }
                                
                            </div> 
                        </div> 
                    </div>
                    <div className="border-t border-border pb-4 px-4"> 
                        <Comments postid ={data.id} isAuthor={isAuthor} userId={user? user.id : null} />
                        {user && <AddComment postId={data.id} />}
                    </div> 
                </div> 
            }
        </div>
    )
}

export default PostPage