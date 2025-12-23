import { z } from 'zod'

const optionalDataList = ['title', 'salary', 'joined_date']

export const employeeDataValidationSchema = z
  .object({
    title: z.string("Please insert employee's title").optional(),
    salary: z.string("Please insert employee's salary").optional(),
    allowance: z.string().nullable(),
    premium: z.string().nullable(),
    daily_allowance: z.string().nullable(),
    meal_allowance: z.string().nullable(),
    overtime_pay: z.string().nullable(),
    joined_date: z.string("Please insert employee's joined date").optional(),
  })
  .nullable()

export const userFormValidationSchema = z
  .object({
    name: z
      .string("Please insert a user's name")
      .min(1, "Please insert a user's name"),
    email: z.email('Please insert a valid email address'),
    role_id: z
      .string('Please select a role of this user')
      .min(1, 'Please select a role of this user'),
    has_employee_data: z.boolean(),
    employee_data: employeeDataValidationSchema,
  })
  .superRefine((data, ctx) => {
    if (data.has_employee_data) {
      optionalDataList.forEach((item) => {
        if (
          !data.employee_data?.[
            item as keyof z.infer<typeof employeeDataValidationSchema>
          ]
        ) {
          ctx.addIssue({
            code: 'too_small',
            origin: 'string',
            minimum: 1,
            message: `Please insert employee's ${item.replace('_', ' ')}`,
            path: [`employee_data.${item}`],
          })
        }
      })

      if (!Number(data.employee_data?.salary?.replaceAll(',', ''))) {
        ctx.addIssue({
          code: 'too_small',
          origin: 'string',
          minimum: 1,
          message: 'Salary must be greater than zero',
          path: [`employee_data.salary`],
        })
      }
    }
  })

export const assignLocationValidationSchema = z.object({
  location_id: z.string().optional(),
  locations: z
    .array(
      z.object({
        location_id: z.string(),
      })
    )
    .min(1, 'You must select at least one location'),
})
