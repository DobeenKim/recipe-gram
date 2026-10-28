'use client'
import { DeletCommentAction } from "@/action/delet-comment"
import { useMutation } from "@tanstack/react-query"

const DeleteButton = ({commentId} : {commentId:  string}) => {
    const {mutate} = useMutation({
        mutationFn: DeletCommentAction
    })
    return (
        <div onClick={() => mutate(commentId)} className="max-w-fit p-0 delete-button cursor-pointer">Delete</div>
    )
}

export default DeleteButton