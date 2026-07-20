import PropTypes from 'prop-types'
import Icon from '../icons/Icon'

function CategoryFilter ({ categories, selectedCategory, onSelect }) {
  return (
    <section className='category-filter' aria-label='Filter kategori'>
      <div className='category-filter__label'>
        <Icon name='tag' size={17} />
        <span>Topik pilihan</span>
      </div>
      <div className='category-filter__chips'>
        {categories.map(({ name, count }) => (
          <button
            type='button'
            key={name}
            className={selectedCategory === name ? 'is-active' : ''}
            onClick={() => onSelect(name)}
            aria-pressed={selectedCategory === name}
          >
            <span>{name === 'Semua' ? name : `#${name}`}</span>
            <small>{count}</small>
          </button>
        ))}
      </div>
    </section>
  )
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  })).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default CategoryFilter
