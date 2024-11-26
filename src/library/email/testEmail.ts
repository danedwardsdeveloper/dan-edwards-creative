import { generateEmailHyperlink } from './htmlComponents/hyperlink'

export const testEmailSubject = 'New song: Piece of Me (ft. rowan)'

export const testEmail = [
  `Hey Dan`,
  `I've got a new song coming out!`,
  `${generateEmailHyperlink('https://www.spotify.com', 'Listen on Spotify')}`,
]
