function formatRelativeTime (dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (Number.isNaN(diffInSeconds)) {
    return 'waktu tidak diketahui'
  }

  if (diffInSeconds < 60) {
    return 'baru saja'
  }

  const units = [
    { label: 'tahun', seconds: 31536000 },
    { label: 'bulan', seconds: 2592000 },
    { label: 'hari', seconds: 86400 },
    { label: 'jam', seconds: 3600 },
    { label: 'menit', seconds: 60 }
  ]

  const unit = units.find((item) => diffInSeconds >= item.seconds)
  const value = Math.floor(diffInSeconds / unit.seconds)

  return `${value} ${unit.label} lalu`
}

function formatFullDate (dateString) {
  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return 'Tanggal tidak diketahui'
  }

  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(date)
}

export { formatRelativeTime, formatFullDate }
