import { getPostComments } from "@/lib/supabase/queries";
import DeleteComment from "./deleteComment";
import { MessageCircle } from "lucide-react";

const Comments = async({postid, isAuthor, userId} : {postid : string, isAuthor: boolean, userId: string | null}) => {
    const comments = await getPostComments(postid)

    return (
        <div className="py-5 flex flex-col gap-4">
            {comments && comments.length ? comments.map(comment => (
                <div key={comment.id} className="flex flex-col">
                    <p className="ptagText2 font-bold">@{comment.userid.username}</p>
                    <div className=" flex justify-between items-center">
                        <p className="ptagText2">{comment.content}</p>
                        {(isAuthor || (userId === comment.userid.id)) &&  <DeleteComment commentId = {comment.id} />}
                    </div>
                </div>
            ))
                : 
                <div>
                    
                    <div className="flex flex-col items-center py-[48px] gap-4">
                        <MessageCircle className="text-point"/>
                        <h2 className="font-bold text-[16px]">Start the conversation</h2>
                        <p className="ptagText">Share a tip or ask about this recipe.</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Comments