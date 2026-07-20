import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LeaderboardItem from './LeaderboardItem'

/*
Skenario pengujian komponen LeaderboardItem:
1. Harus menampilkan nomor peringkat dengan dua digit.
2. Harus menampilkan nama pengguna dan skor.
*/

describe('LeaderboardItem component', () => {
  const item = {
    user: {
      name: 'Aulia',
      avatar: 'https://example.com/avatar.png'
    },
    score: 125
  }

  it('should render a padded rank number', () => {
    render(<ul><LeaderboardItem item={item} rank={3} /></ul>)

    expect(screen.getByText('03')).toBeInTheDocument()
  })

  it('should render the user name and score', () => {
    render(<ul><LeaderboardItem item={item} rank={1} /></ul>)

    expect(screen.getByText('Aulia')).toBeInTheDocument()
    expect(screen.getByText('125')).toBeInTheDocument()
    expect(screen.getByText('poin')).toBeInTheDocument()
  })
})
