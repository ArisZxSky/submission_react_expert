import PropTypes from 'prop-types'

const paths = {
  home: <><path d='M3 11.5 12 4l9 7.5' /><path d='M5.5 10.5V20h13v-9.5' /><path d='M9 20v-6h6v6' /></>,
  trophy: <><path d='M8 3h8v4a4 4 0 0 1-8 0V3Z' /><path d='M6 5H3v2a4 4 0 0 0 5 3.9' /><path d='M18 5h3v2a4 4 0 0 1-5 3.9' /><path d='M12 11v5' /><path d='M8 21h8' /><path d='M9 16h6v5H9z' /></>,
  plus: <><path d='M12 5v14' /><path d='M5 12h14' /></>,
  login: <><path d='M10 17l5-5-5-5' /><path d='M15 12H3' /><path d='M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4' /></>,
  logout: <><path d='M14 8l4 4-4 4' /><path d='M18 12H7' /><path d='M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5' /></>,
  message: <><path d='M21 15a4 4 0 0 1-4 4H8l-5 3v-7a4 4 0 0 1-1-2.7V7a4 4 0 0 1 4-4h11a4 4 0 0 1 4 4v8Z' /></>,
  comment: <><path d='M21 15a4 4 0 0 1-4 4H9l-5 3v-6a4 4 0 0 1-1-2.5V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v7Z' /></>,
  up: <><path d='m6 15 6-6 6 6' /></>,
  down: <><path d='m6 9 6 6 6-6' /></>,
  clock: <><circle cx='12' cy='12' r='9' /><path d='M12 7v5l3 2' /></>,
  tag: <><path d='M20 13 11 22l-9-9V4h9l9 9Z' /><circle cx='7' cy='9' r='1.5' /></>,
  arrowLeft: <><path d='m15 18-6-6 6-6' /><path d='M9 12h12' /></>,
  send: <><path d='m22 2-7 20-4-9-9-4 20-7Z' /><path d='M22 2 11 13' /></>,
  eye: <><path d='M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z' /><circle cx='12' cy='12' r='2.5' /></>,
  eyeOff: <><path d='m3 3 18 18' /><path d='M10.6 6.2A10.6 10.6 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-2.1 2.8' /><path d='M6.2 6.2C3.5 8 2 12 2 12s3.5 6 10 6a10 10 0 0 0 3.8-.7' /></>,
  check: <><path d='m5 12 4 4L19 6' /></>,
  menu: <><path d='M4 7h16' /><path d='M4 12h16' /><path d='M4 17h16' /></>,
  close: <><path d='m6 6 12 12' /><path d='m18 6-12 12' /></>,
  spark: <><path d='m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z' /><path d='m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z' /></>,
  user: <><circle cx='12' cy='8' r='4' /><path d='M4 21a8 8 0 0 1 16 0' /></>
}

function Icon ({ name, size = 20, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      {paths[name] || paths.spark}
    </svg>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string
}

export default Icon
