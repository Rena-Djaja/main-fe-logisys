import {z} from "zod";

export const exampleValidationSchema = z.object({
  name: z.string('Please insert your name'),
  gender: z.string('Please select your gender'),
  status: z.array(z.string()).optional(),
})