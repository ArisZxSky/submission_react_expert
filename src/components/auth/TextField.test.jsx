import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import TextField from './TextField'

/*
Skenario pengujian komponen TextField:
1. Harus menghubungkan label dengan input dan meneruskan perubahan nilai.
2. Harus menampilkan help text ketika tersedia.
3. Harus dapat menampilkan dan menyembunyikan password.
*/

describe('TextField component', () => {
  it('should associate its label and forward input changes', () => {
    const onChange = vi.fn()
    render(
      <TextField
        id='email'
        label='Alamat email'
        type='email'
        value=''
        onChange={onChange}
      />
    )

    fireEvent.change(screen.getByLabelText('Alamat email'), {
      target: { value: 'aulia@example.com' }
    })

    expect(onChange).toHaveBeenCalledOnce()
  })

  it('should render the provided help text', () => {
    render(
      <TextField
        id='name'
        label='Nama'
        value='Aulia'
        onChange={() => {}}
        helpText='Gunakan nama yang mudah dikenali.'
      />
    )

    expect(screen.getByText('Gunakan nama yang mudah dikenali.')).toBeInTheDocument()
  })

  it('should toggle password visibility', () => {
    render(
      <TextField
        id='password'
        label='Password'
        type='password'
        value='rahasia123'
        onChange={() => {}}
      />
    )

    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')

    fireEvent.click(screen.getByRole('button', { name: 'Tampilkan password' }))
    expect(input).toHaveAttribute('type', 'text')

    fireEvent.click(screen.getByRole('button', { name: 'Sembunyikan password' }))
    expect(input).toHaveAttribute('type', 'password')
  })
})
