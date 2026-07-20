import Button from './Button'

const meta = {
  title: 'Common/Button',
  component: Button,
  args: {
    children: 'Mulai berdiskusi',
    onClick: () => {}
  }
}

export default meta

export const Primary = {
  args: {
    variant: 'primary'
  }
}

export const Secondary = {
  args: {
    variant: 'secondary',
    icon: 'message'
  }
}

export const Disabled = {
  args: {
    disabled: true,
    children: 'Memproses…'
  }
}
