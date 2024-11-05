const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

const productionBaseURL = 'https://dandigresses.co.uk'
const developmentBaseURL = 'http://localhost:3000'
const dynamicBaseURL = isProduction ? productionBaseURL : developmentBaseURL

export const environment = {
  isProduction,
  isDevelopment,
  productionBaseURL,
  dynamicBaseURL,
} as const
