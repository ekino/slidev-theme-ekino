import type { ShikiSetupReturn } from '@slidev/types'
import { defineShikiSetup } from '@slidev/types'

// Monochrome syntax highlighting: the charte allows the palette greys only,
// plus the accent, kept for keywords.
function ekinoTheme(type: 'light' | 'dark') {
  const light = type === 'light'
  const fg = light ? '#2b2b2b' : '#ffffff'
  const muted = light ? '#6b6b6b' : '#a5a5a5'
  const accent = '#e60000'

  return {
    name: `ekino-${type}`,
    type,
    colors: {
      'editor.background': light ? '#f2f2f2' : '#3b3b3b',
      'editor.foreground': fg,
    },
    tokenColors: [
      { settings: { foreground: fg } },
      {
        scope: ['comment', 'punctuation.definition.comment'],
        settings: { foreground: muted, fontStyle: 'italic' },
      },
      {
        scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.operator.new', 'keyword.control'],
        settings: { foreground: accent },
      },
      {
        scope: ['string', 'string.template', 'punctuation.definition.string'],
        settings: { foreground: muted },
      },
      {
        scope: ['entity.name.function', 'support.function', 'entity.name.type', 'entity.name.class', 'support.class', 'entity.name.tag'],
        settings: { foreground: fg, fontStyle: 'bold' },
      },
      {
        scope: ['constant', 'constant.numeric', 'constant.language', 'variable.language', 'support.constant'],
        settings: { foreground: fg, fontStyle: 'bold' },
      },
      {
        scope: ['punctuation', 'meta.brace', 'keyword.operator'],
        settings: { foreground: muted },
      },
      {
        scope: ['entity.other.attribute-name', 'support.type.property-name', 'meta.object-literal.key'],
        settings: { foreground: fg },
      },
      {
        scope: ['markup.inserted'],
        settings: { foreground: fg, fontStyle: 'bold' },
      },
      {
        scope: ['markup.deleted'],
        settings: { foreground: accent },
      },
    ],
  }
}

export default defineShikiSetup((): ShikiSetupReturn => {
  return {
    themes: {
      dark: ekinoTheme('dark'),
      light: ekinoTheme('light'),
    },
  }
})
