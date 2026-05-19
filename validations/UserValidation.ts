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
      .string('Mohon masukkan nama lengkap pengguna')
      .min(1, 'Mohon masukkan nama lengkap pengguna'),
    email: z.email('Email tidak valid'),
    role_id: z
      .string('Mohon pilih jenis pengguna')
      .min(1, 'Mohon pilih jenis pengguna'),
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
  province_id: z.string('Mohon pilih provinsi').min(1, 'Mohon pilih provinsi'),
  regency_id: z
    .string('Mohon pilih kabupaten/kota')
    .min(1, 'Mohon pilih kabupaten/kota'),
  locations: z
    .array(
      z.object({
        province_id: z.string(),
        regency_id: z.string(),
      })
    )
    .min(1, 'Mohon pilih setidaknya satu lokasi'),
})
