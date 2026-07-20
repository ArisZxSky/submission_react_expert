import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import VoteControl from './VoteControl'

/*
Skenario pengujian komponen VoteControl:
1. Harus menampilkan jumlah up-vote dan down-vote.
2. Harus menandai tombol vote milik pengguna sebagai aktif.
3. Harus memanggil onVote dengan intent yang benar.
*/

describe('VoteControl component', () => {
  it('should render up-vote and down-vote totals', () => {
    render(
      <VoteControl
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        authUserId='user-4'
        onVote={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: 'Up-vote' })).toHaveTextContent('2')
    expect(screen.getByRole('button', { name: 'Down-vote' })).toHaveTextContent('1')
  })

  it('should mark the authenticated user vote as active', () => {
    render(
      <VoteControl
        upVotesBy={['user-1']}
        downVotesBy={[]}
        authUserId='user-1'
        onVote={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: 'Up-vote' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Down-vote' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('should call onVote with the selected intent', () => {
    const onVote = vi.fn()
    render(
      <VoteControl
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId='user-1'
        onVote={onVote}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Down-vote' }))

    expect(onVote).toHaveBeenCalledWith('down')
  })
})
