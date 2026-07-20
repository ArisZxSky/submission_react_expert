import CategoryFilter from './CategoryFilter'

const categories = [
  { name: 'Semua', count: 18 },
  { name: 'react', count: 7 },
  { name: 'testing', count: 6 },
  { name: 'karier', count: 5 }
]

const meta = {
  title: 'Thread/CategoryFilter',
  component: CategoryFilter,
  args: {
    categories,
    onSelect: () => {}
  }
}

export default meta

export const AllSelected = {
  args: {
    selectedCategory: 'Semua'
  }
}

export const TestingSelected = {
  args: {
    selectedCategory: 'testing'
  }
}
