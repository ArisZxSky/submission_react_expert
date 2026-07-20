import { describe, expect, it } from 'vitest'
import reducer, {
  resetCategoryFilter,
  setCategoryFilter
} from './slice'

/*
Skenario pengujian reducer categoryFilter:
1. Harus menggunakan kategori Semua sebagai initial state.
2. Harus mengganti filter berdasarkan kategori yang dipilih.
3. Harus mengembalikan filter ke Semua ketika reset dilakukan.
*/

describe('categoryFilter reducer', () => {
  it('should use Semua as the initial category', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toBe('Semua')
  })

  it('should set the selected category', () => {
    expect(reducer('Semua', setCategoryFilter('react'))).toBe('react')
  })

  it('should reset the selected category', () => {
    expect(reducer('redux', resetCategoryFilter())).toBe('Semua')
  })
})
