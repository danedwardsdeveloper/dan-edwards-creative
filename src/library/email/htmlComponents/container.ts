import { fontBase, slate200, zinc700, zinc900 } from '../styles'
import { generateEmailHyperlink } from './hyperlink'

export default function generateEmailContainer(content: string[], unsubscribeLink: string): string {
  const contentHtml = content
    .map(
      text => `
      <p style="
        margin-bottom: 32px;">
        ${text}
      </p>
    `,
    )
    .join('')

  return `
    <div style="
      max-width: 600px;
      margin: 0;
      padding: 0;
      line-height: 1.5;
      font-size: ${fontBase};
      color: ${zinc700};
      box-sizing: border-box;">
      
      ${contentHtml}
      
      <div style="
        border-top: 1px solid ${slate200};
        padding: 20px 0;
        margin-top: 20px;">
        
        <div style="margin-bottom: 20px;">
          <span style="
            font-weight: 500;
            display: block;
            margin-bottom: 4px;
            color: ${zinc900}">
            Dan Edwards creative
          </span>
          <span style="
            display: block;
            margin-bottom: 8px;">
            Pop music producer & songwriter
          </span>
          ${generateEmailHyperlink('https://danedwardscreative.com/', 'danedwardscreative.com')}
        </div>
        ${generateEmailHyperlink(unsubscribeLink, 'Unsubscribe', 'grey')}
      </div>
    </div>
  `
}
