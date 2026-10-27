import { createClient } from "./browserClient"
import { type QueryData } from "@supabase/supabase-js"

export const getHomePosts = async (supabase:ReturnType<typeof createClient>) => {

    return await supabase.from('recipe_posts')
        .select('id,title, slug,content, category,image ,author("username"), Comments(count)')
        .order('created_at', {ascending: false})
}

export const getSinglePost = async(slug:string) => {
    const supabase = createClient()

    return await supabase.from('recipe_posts')
    .select('id, title, content, category, image, author("id","username")')
    .eq('slug', slug)
    .single()
}
export const searchPosts = async(searchTerm: string) => {
    const supabase = createClient()
        return await supabase.from('recipe_posts')
        .select('title, slug')
        .textSearch('title',`%${searchTerm}%`)
}

export const getPostComments = async(postid: string) => {
    const supabase =  createClient()
    const {data, error} = 
    await supabase.from("Comments")
        .select('id, content, userid("id", "username")')
        .eq("postid", postid)
        .order('created_at', {ascending: false})
            
        return data;
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>;

export type getSinglePost = QueryData<ReturnType<typeof getSinglePost>>;

export type SearchResultType = QueryData<ReturnType<typeof searchPosts>>;

export type CommentsType = QueryData<ReturnType<typeof getPostComments>>;
