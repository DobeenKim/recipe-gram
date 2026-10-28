'use client'

import { CreatePost } from "@/action/create-post-action"
import { postSchema } from "@/action/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

const CreatePostPage = () => {

    const postImageSchema = postSchema.omit({image: true})
    .extend({image: z.unknown().transform(value => {return value as FileList}).optional()})

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(postImageSchema)
    })

    const {mutate, error} = useMutation({
        mutationFn: CreatePost
    })

    return (
        <div className="w-full px-4 max-w-[730px] mx-auto">
            <h2 className="titleText pb-[29px] pt-[32px]">Share a recipe</h2>
            <form onSubmit={handleSubmit(values => {
                const imageForm = new FormData()
                if(values.image) imageForm.append('image', values.image[0])
                    mutate({
                        title: values.title,
                        content: values.content,
                        image: imageForm,
                        category: values.category,
                        ingredient:values.ingredient
                    })
                })}>
                <div className="flex flex-col gap-[18px]">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title">Recipe title</label>
                        <input {...register("title")}  className="border2" />
                        {errors.title && <ErrorMessage error={errors.title.message!} />}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Category</label>
                        <select {...register("category")} className="border2  w-full" required>
                            <option value="">Select category</option>
                            <option value="Meat">Meat</option>
                            <option value="Seafood">Seafood</option>
                            <option value="Vege">Vege</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Drinks">Drinks</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="image" >Image URL(optional)</label>
                        <input type="file" {...register("image")}  className="border2"/>
                        {errors.image && <ErrorMessage error={errors.image.message!} />}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="content" >Content</label>
                        <textarea {...register("content")} className="border2" placeholder="Content:" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="content" >Ingredient</label>
                        <textarea {...register("ingredient")} className="border2" placeholder="Ingredient:" />
                    </div>
                    <button className="button-signUp">Publish recipe</button>
                    {error && <ErrorMessage error={error.message} />}
                </div>
            </form>
        </div>
    )
}

export default CreatePostPage