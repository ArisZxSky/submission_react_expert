import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ThreadCard from './ThreadCard'

/*
Skenario pengujian komponen ThreadCard:
1. Harus menampilkan judul, kategori, pemilik, dan jumlah komentar.
2. Judul pada mode daftar harus mengarah ke halaman detail thread.
3. Mode detail harus menampilkan body lengkap sebagai teks yang aman.
*/

describe('ThreadCard component', () => {
  const thread = {
    id: 'thread-1',
    title: 'Belajar automation testing di React',
    body: '<p>Pengujian membuat refactor lebih aman.</p>',
    category: 'testing',
    createdAt: '2026-07-19T00:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: ['user-2'],
    downVotesBy: [],
    totalComments: 4
  }

  const owner = {
    id: 'user-1',
    name: 'Aulia',
    avatar: 'https://example.com/avatar.png'
  }

  it('should render core thread information', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThreadCard
          thread={thread}
          owner={owner}
          authUserId='user-2'
          onVote={() => {}}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('#testing')).toBeInTheDocument()
    expect(screen.getByText('Aulia')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '4 komentar' })).toBeInTheDocument()
  })

  it('should link the list title to its detail page', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThreadCard
          thread={thread}
          owner={owner}
          onVote={() => {}}
        />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: thread.title })).toHaveAttribute('href', '/threads/thread-1')
  })

  it('should render the complete sanitized body in detail mode', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThreadCard
          thread={thread}
          owner={owner}
          onVote={() => {}}
          detail
        />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 1, name: thread.title })).toBeInTheDocument()
    expect(screen.getByText('Pengujian membuat refactor lebih aman.')).toBeInTheDocument()
    expect(screen.queryByText('<p>')).not.toBeInTheDocument()
  })
})
