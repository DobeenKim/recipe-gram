'use client'
import { createClient } from "@/lib/supabase/browserClient"; 
import { HomePostType } from "@/lib/supabase/queries";
import Link from "next/link";
import Search from "../Header/search";
import { Heart, MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import LikeButton from "../LikeButton";

export const revalidate = 0;

const HomePosts = ({posts}:{posts: HomePostType}) => {
    const supabase = createClient()

    const [likedPostId, setLikedPostId] = useState<string[]>([]) 

    const [selectedCategory, setSelectedCategory] = useState("All")
    const categories = ["All", "Meat", "Seafood", "Vege", "Dessert", "Drink"]

    const filteredPosts = selectedCategory === "All" 
        ? posts 
        : posts.filter(post => post.category === selectedCategory);

    useEffect(() => {
        const fetchUserLikes = async() => {
            const {data: {user} } = await supabase.auth.getUser();
            if(!user) return;

            const {data, error: error} = await supabase
            .from("likes")
            .select("post_id")
            .eq("user_id", user.id);

            if(!error && data){
                setLikedPostId(data.map(item => item.post_id));
            }
        };
        fetchUserLikes();
    }, [supabase]);

    return (
        <div className="mx-4">
            <Search />
            <div className="flex gap-2 overflow-x-auto mb-6 pb-2 scrollbar-none">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${
                            selectedCategory === category
                                ? "bg-point text-ivory"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200" 
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <p className="categoryText">Today's kitchen</p>
            <h2 className="titleText mt-3.5 mb-7.75">Fresh from the community</h2>
            {filteredPosts.length === 0 ? (
                <p className="text-gray-400 text-center py-10">No recipes in this category.</p>
            ) : (
                filteredPosts.map(post => {
                    const isAlreadyLiked = likedPostId.includes(post.id)
                    return(
                        <React.Fragment key={post.id} > 
                            <div className="pb-7 flex flex-col gap-3">
                                <Link className="block" href={`/${post.slug}`}>
                                    <div className="">
                                        <div className="max-w-[730px] mx-auto">
                                            {post.image && 
                                                <img className="w-full rounded-2xl" src={post.image} alt={post.title} />
                                            }
                                        </div>
                                        <div className="px-[4px] flex flex-col gap-[13px] pt-[12px] w-full ">
                                            <div className="flex flex-row justify-between">
                                                <p className="categoryText">{post.category}</p>
                                                <p className="ptagText">by @{post.author.username}</p>
                                            </div>
                                            <div className="max-w-[310px] md:max-w-[730px] flex flex-col gap-[13px]">
                                                <h3 className="titleText break-words">{post.title}</h3>
                                                <p className="ptagText break-words">
                                                    {post.content && post.content.length > 70 
                                                    ? `${post.content?.slice(0, 70)}...`
                                                    : ( post.content|| '')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex justify-between pt-[11px]">
                                    <div className="flex gap-4">
                                        <LikeButton postId={post.id} initialLiked={isAlreadyLiked} />
                                        <Link href={`/${post.slug}`} className="flex flex-row gap-1">
                                            <MessageCircle className="text-icon w-4.5 h-4.5"/>
                                            {post.Comments?.[0]?.count > 0 && (
                                                <span className="text-xs text-icon">
                                                    {post.Comments[0].count}
                                                </span>
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })
            )}
        </div>
    )
}

export default HomePosts