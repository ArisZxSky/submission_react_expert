import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import CategoryFilter from './CategoryFilter'

/*
Skenario pengujian komponen CategoryFilter:
1. Harus menampilkan seluruh kategori dan jumlah thread.
2. Harus memberi indikasi aktif pada kategori terpilih.
3. Harus memanggil onSelect dengan nama kategori ketika tombol diklik.
*/

describe('CategoryFilter component', () => {
  const categories = [
    { name: 'Semua', count: 5 },
    { name: 'react', count: 3 },
    { name: 'testing', count: 2 }
  ]

  it('should render every category and its thread count', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory='Semua'
        onSelect={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: /Semua 5/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /#react 3/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /#testing 2/i })).toBeInTheDocument()
  })

  it('should mark the selected category as active', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory='react'
        onSelect={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: /#react 3/i })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /Semua 5/i })).toHaveAttribute('aria-pressed', 'false')
  })

  it('should call onSelect with the clicked category', () => {
    const onSelect = vi.fn()
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory='Semua'
        onSelect={onSelect}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /#testing 2/i }))

    expect(onSelect).toHaveBeenCalledWith('testing')
  })
})
