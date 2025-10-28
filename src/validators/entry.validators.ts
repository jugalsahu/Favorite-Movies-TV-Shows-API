import { z as zod } from "zod"

const validateEntry = zod.object({
    title: zod.string().min(1),
    type: zod.enum(['MOVIE', 'TV_SHOW']),
    director: zod.string().min(1),
    budget: zod.preprocess((val) => Number(val), zod.number().nonnegative()),
    location: zod.string().min(1),
    duration: zod.string().min(1),
    yearTime: zod.string().min(1)
}).strict()

export default validateEntry