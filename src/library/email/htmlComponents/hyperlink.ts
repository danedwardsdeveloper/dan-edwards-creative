import { blue500, fontBase, zinc500 } from '../styles'

export function generateEmailHyperlink(
  href: string,
  displayText: string,
  variant: 'blue' | 'grey' = 'blue',
): string {
  const colorCode = variant === 'blue' ? blue500 : zinc500

  return `
      <a href="${href}" style="
        color: ${colorCode};
        text-decoration-color: ${colorCode};
        text-decoration: underline;
        text-underline-offset: 2px;
        display: inline-block;
        font-size: ${fontBase};">
        ${displayText}
      </a>
    `
}
