'use client'
import { postSchema } from '@/action/schemas'
import ErrorMessage from '@/components/ErrorMessage'
import {type Tables} from '@/lib/supabase/database.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { EditPost } from '@/action/edit-page-action'
import z from 'zod'

const EditPageForm = ({initialValues, postId} : {initialValues: Pick<Tables<"recipe_posts">, "title" | "content" | "image" | "category">, postId:string}) => {
    const postImageSchema = postSchema.omit({image: true})
        .extend({image: z.unknown().transform(value => {return value as FileList}).optional()})

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(postImageSchema),
        defaultValues:{
            title: initialValues.title,
            category: initialValues.category || "",
            content: initialValues.content || undefined,
            image:initialValues.image || undefined
        }
    })

    const {mutate, error} = useMutation({
        mutationFn: EditPost
    })

    return (
        <form onSubmit={handleSubmit(values => {
            let imageForm = undefined;
            if(values.image && typeof values.image !== "string"){
                imageForm = new FormData()
                imageForm.append('image', values.image[0])
            } 

            mutate({
                postdata: {
                    title:values.title,
                    category:values.category,
                    content:values.content,
                    image: imageForm
                }, postId
            })}
        )}>
            <div className='flex flex-col gap-[18px] max-w-[730px] mx-auto'>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Add a title</label>
                    <input {...register("title")} className="border2"></input>
                    {errors.title && <ErrorMessage error={errors.title.message!} />}
                </div>
                <div className="flex flex-col gap-1">
                        <label htmlFor="content" >Add content(optional)</label>
                        <textarea {...register("content")} className="border2"></textarea>
                    </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="content">Add some content(optional)</label>
                    <select {...register("category")} className="border2  w-full" required>
                            <option value="">Select category</option>
                            <option value="Meat">Meat</option>
                            <option value="Seafood">Seafood</option>
                            <option value="Vege">Vege</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Drink">Drink</option>
                        </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="image">Add an image(optional)</label>
                    <input type="file" {...register("image")} className="border2" />
                    {initialValues.image && 
                        <div className="w-full max-w-[500px]">
                            <img src={initialValues.image} alt={'initialValues.title'} />
                        </div>
                    }
                    {errors.image && <ErrorMessage error={errors.image.message!} />}
                </div>
                <button className="create-button">Create Post</button>
                {error && <ErrorMessage error={error.message} />}
            </div>
        </form>
    )
}

export default EditPageForm