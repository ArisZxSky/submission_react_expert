import { MemoryRouter } from 'react-router-dom'
import '../src/styles/global.css'

const preview = {
  decorators: [
    (Story) => (
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className='container' style={{ paddingBlock: '2rem' }}>
          <Story />
        </div>
      </MemoryRouter>
    )
  ],
  parameters: {
    controls: {
      expanded: true
    },
    layout: 'fullscreen'
  }
}

export default preview
