import ThreadCard from './ThreadCard'

const thread = {
  id: 'thread-storybook',
  title: 'Bagaimana strategi automation testing yang efektif?',
  body: '<p>Saya sedang menyusun unit, integration, dan end-to-end test untuk aplikasi React.</p>',
  category: 'testing',
  createdAt: '2026-07-19T07:00:00.000Z',
  ownerId: 'user-storybook',
  upVotesBy: ['user-1', 'user-2', 'user-3'],
  downVotesBy: ['user-4'],
  totalComments: 8
}

const owner = {
  id: 'user-storybook',
  name: 'Nadia Pratama',
  avatar: 'https://ui-avatars.com/api/?name=Nadia+Pratama'
}

const meta = {
  title: 'Thread/ThreadCard',
  component: ThreadCard,
  args: {
    thread,
    owner,
    authUserId: 'user-1',
    onVote: () => {}
  }
}

export default meta

export const ListItem = {}

export const Detail = {
  args: {
    detail: true
  }
}

export const GuestView = {
  args: {
    authUserId: undefined
  }
}
