import { z } from 'zod'

export const warehouseValidationSchema = z.object({
  name: z.string().min(1, "Please insert the warehouse's name"),
  location: z.string().min(1, 'Please insert the location of the warehouse'),
})
