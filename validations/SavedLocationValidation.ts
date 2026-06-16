import { z } from 'zod'

export const savedLocationSchema = z.object({
  name: z.string('Nama alamat harus diisi').min(1, 'Nama alamat harus diisi'),
  address_type: z
    .string('Jenis alamat harus diisi')
    .min(1, 'Jenis alamat harus diisi'),
  address: z.string('Alamat harus diisi').min(1, 'Alamat harus diisi'),
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
  lat_long: z.string().optional(),
})
