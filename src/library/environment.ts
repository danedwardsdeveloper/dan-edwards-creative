export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'

export const productionBaseURL = 'https://danedwardscreative.com'
export const developmentBaseURL = 'http://localhost:3000'
export const dynamicBaseURL = isProduction ? productionBaseURL : developmentBaseURL
export const spotifyRedirectUri = `${dynamicBaseURL}/api/spotify/callback`
