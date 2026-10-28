'use client'

import { DeletePost } from "@/action/delete-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeleteButton = ({id} : {id:string}) => {
    const {mutate} = useMutation({
        mutationFn: DeletePost,
        onSettled: () => toast.success("Your post has been deleted")
    })
    return (
        <>
        <button onClick={() =>mutate(id)} className="delete-button cursor-pointer">Delete Post</button>
        </>
        
    )
}

export default DeleteButton