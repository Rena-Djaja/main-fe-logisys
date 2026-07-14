import { z } from 'zod'

export const supplierFormValidationSchema = z
  .object({
    name: z
      .string('Nama perusahaan harus diisi')
      .min(1, 'Nama perusahaan harus diisi'),
    address: z
      .string('Alamat usaha harus diisi')
      .min(1, 'Alamat usaha harus diisi'),
    phone_number: z.string().nullable(),
    latitude: z.number(),
    longitude: z.number(),
    province_id: z
      .string('Harus ada provinsi terpilih')
      .min(1, 'Harus ada provinsi terpilih'),
    regency_id: z
      .string('Harus ada kabupaten/kota terpilih')
      .min(1, 'Harus ada kabupaten/kota terpilih'),
    district_id: z
      .string('Harus ada kecamatan terpilih')
      .min(1, 'Harus ada kecamatan terpilih'),
    village_id: z
      .string('Harus ada desa/kelurahan terpilih')
      .min(1, 'Harus ada desa/kelurahan terpilih'),
  })
  .superRefine((data, ctx) => {
    if (data.phone_number) {
      if (data.phone_number.length > 0 && data.phone_number.length < 11) {
        ctx.addIssue({
          code: 'too_small',
          origin: 'string',
          minimum: 11,
          message: 'Phone number must be at least 11 digits',
          path: ['phone_number'],
        })
      }
      if (!/^(62)(8|2)[1-9][0-9]{6,9}$/.test(data.phone_number)) {
        ctx.addIssue({
          code: 'custom',
          origin: 'string',
          message:
            "Phone number should contain only numeric value and started with '62'",
          path: ['phone_number'],
        })
      }
    }
  })
