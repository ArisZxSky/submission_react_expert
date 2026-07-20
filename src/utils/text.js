function stripHtml (value = '') {
  if (typeof document === 'undefined') {
    return value.replace(/<[^>]*>/g, ' ')
  }

  const parser = new DOMParser()
  const parsed = parser.parseFromString(value, 'text/html')
  return parsed.body.textContent || ''
}

function createExcerpt (value, maxLength = 180) {
  const text = stripHtml(value).replace(/\s+/g, ' ').trim()

  if (text.length <= maxLength) {
    return text
  }

  return `${text.slice(0, maxLength).trim()}…`
}

export { stripHtml, createExcerpt }
