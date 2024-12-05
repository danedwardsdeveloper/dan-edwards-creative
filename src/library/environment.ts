const nodeEnv = process.env.NODE_ENV

if (!nodeEnv) {
  throw new Error('NODE_ENV missing')
}
if (nodeEnv !== 'production' && nodeEnv !== 'development') {
  throw new Error(`NODE_ENV set to ${nodeEnv}, not 'development' or 'production'`)
}

export const isProduction = nodeEnv === 'production'
export const isDevelopment = nodeEnv === 'development'

export const productionBaseURL = 'https://danedwardscreative.com'
export const developmentBaseURL = 'http://localhost:3000'
export const dynamicBaseURL = isProduction ? productionBaseURL : developmentBaseURL

export const cloudfrontDomain = 'https://d1zazl06f7w9hx.cloudfront.net'
