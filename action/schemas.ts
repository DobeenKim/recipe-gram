import {z} from 'zod'

export const loginSchema = z.object({
    email: z.email("Incorrect email pattern"),
    password:z.string().min(6, "Passwords must be 5 characters")
})

export const signUpSchema = z.object({
    email: z.email("Incorrect email pattern"),
    password: z.string().min(6, "Passwords must be 5 characters"),
    username: z.string().min(6, "You need at least 6 characters").optional()
})

export const postSchema = z.object({
    title: z.string().min(6, "Your title must be at least 6 characters long"),
    content: z.string().optional(),
    image: z.instanceof(FormData).optional(),
    category: z.string().min(1, "Category is required"),
    ingredient: z.string().min(6, "You must write ingredient at least 6 characters long"),
})

export const commentSchema = z.object({
    content: z.string().min(6, "Comments must at least 6 characters long")
})