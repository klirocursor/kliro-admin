import * as yup from 'yup'

const envSchema = yup.object({
  NODE_ENV: yup.string().oneOf(['development', 'production', 'test']).default('development'),
  VITE_APP_BASE_URL: yup.string().optional(),
  VITE_APP_BASE_URL_STAGING: yup.string().optional(),
  VITE_APP_ENVIRONMENT: yup.string().optional(),
  VITE_APP_VERSION: yup.string().optional(),
  VITE_APP_STAGING_HOST: yup.string().optional(),
  VITE_API_URL: yup.string().optional()
})

export const env = envSchema.validateSync(process.env, {
  abortEarly: false,
  stripUnknown: true
})
