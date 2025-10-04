import {z} from "zod";

export const exampleValidationSchema = z.object({
  name: z
    .string('Please insert your name')
    .min(1, 'Please insert your name'),
  gender: z
    .number('Please select your gender')
    .min(1, 'Please select your gender')
  ,
  status: z.array(z.string()).optional(),
})