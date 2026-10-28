'use client'

import { AddCommentAction } from "@/action/add-comment-action"
import { commentSchema } from "@/action/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Send } from "lucide-react"
import {useForm} from "react-hook-form"
import { toast } from "sonner"

const AddComment = ({postId} : {postId:string}) => {

    const { register, handleSubmit, reset, formState: {errors} } = useForm({
        resolver: zodResolver(commentSchema)
    })

    const {mutate, error} = useMutation({
        mutationFn: AddCommentAction,
        onSuccess: () => reset(),
        onSettled: () => toast("Added comment")
    })
    return (
        <div className="gao-2 border-t border-border mx-auto w-full">
            <form onSubmit={handleSubmit(values => mutate({commentdata: {content: values.content}, postId}))} className="pt-[14px]">
            <label htmlFor="content"></label>
            <div className="flex justify-between items-center gap-2">
                <div className=" flex flex-row justify-between border border-border">
                    <textarea id="content" {...register("content")} placeholder="Add your comment..."  className="w-full resize-none outline-none bg-transparent"/>
                    {errors.content && <ErrorMessage error={errors.content.message!} />}
                </div>
                <button className=" bg-point p-5 rounded-md text-ivory font-bold cursor-pointer"><Send className="w-4 h-4 mx-auto"/>Post</button>
            </div>
            {error && <ErrorMessage error={error.message} />}
        </form>
        </div>
    )
}

export default AddComment