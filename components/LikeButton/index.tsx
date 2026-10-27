'use client'

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { createClient } from "@/lib/supabase/browserClient"

interface LikeButtonProps {
    postId: string;
    initialLiked?: boolean;
    onUnliked?: () => void;
}

const LikeButton = ({ postId, initialLiked = false }: LikeButtonProps) => {
    const supabase = createClient()
    const [isLiked, setIsLiked] = useState(initialLiked)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLiked(initialLiked);
    }, [initialLiked]);

    const handleLikeToggle = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            if (isLiked) {
                const { error } = await supabase
                    .from("likes" as any)
                    .delete()
                    .eq("user_id", user.id)
                    .eq("post_id", postId);

                if (!error) {
                    setIsLiked(false);
                }
            } else {
                const { error } = await supabase
                    .from("likes" as any)
                    .insert({
                        user_id: user.id,
                        post_id: postId,
                    });

                if (!error) {
                    setIsLiked(true);
                }
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <button onClick={handleLikeToggle} disabled={isLoading} className="focus:outline-none cursor-pointer">
            <Heart className={`w-5 h-5 transition-colors ${
                    isLiked ? "fill-point text-point" : "text-icon"
                }`}
            />
        </button>
    )
}

export default LikeButton