'use client'

import { createClient } from "@/lib/supabase/browserClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import LikeButton from "@/components/LikeButton";

export default function SharePage() {
    const supabase = createClient();
    const [posts, setPosts] = useState<any[]>([]);

    const fetchLikedPosts = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return;
        }

        const { data: likesData, error: likesError } = await supabase
            .from("likes" as any)
            .select("post_id")
            .eq("user_id", user.id);

        if (likesError || !likesData || likesData.length === 0) {
            setPosts([]);
            return;
        }

        const postIds = likesData.map((item: any) => item.post_id);

        const { data: recipePosts, error: postsError } = await supabase
            .from("recipe_posts" as any)
            .select(`
                id,
                title,
                content,
                image,
                category,
                slug
            `)
            .in("id", postIds);

        if (!postsError && recipePosts) {
            setPosts(recipePosts);
        }
    };

    useEffect(() => {
        fetchLikedPosts();
    }, []);

    const handleUnliked = (postId: string) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    return (
        <div className="w-full px-4 pb-20 max-w-[730px] md:mx-auto">
            <h2 className="titleText mt-6 mb-6">Saved recipes</h2>

            {posts.length === 0 ? (
                <p className="text-gray-400 text-center py-10">Nothing saved yet</p>
            ) : (
                posts.map((post: any) => (
                    <div key={post.id} className="pb-7 flex flex-col gap-3">
                        <Link className="block" href={`/${post.slug}`}>
                            <div>
                                <div className="max-w-[730px]">
                                    {post.image && 
                                        <img className="w-full rounded-2xl" src={post.image} alt={post.title} />
                                    }
                                </div>
                                <div className="px-[4px] flex flex-col gap-[13px] pt-[12px] w-full ">
                                    <div className="flex flex-row justify-between">
                                        <p className="categoryText">{post.category}</p>
                                    </div>
                                    <div className="max-w-[310px] flex flex-col gap-[13px]">
                                        <h3 className="titleText break-words">{post.title}</h3>
                                        <p className="ptagText break-words">
                                            {post.content && post.content.length > 70 
                                            ? `${post.content.slice(0, 70)}...`
                                            : (post.content || '')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="flex justify-between pt-[11px]">
                            <div className="flex gap-4">
                                <LikeButton 
                                    postId={post.id} 
                                    initialLiked={true} 
                                    onUnliked={() => handleUnliked(post.id)} 
                                />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}