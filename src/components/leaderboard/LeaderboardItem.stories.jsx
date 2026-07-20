import LeaderboardItem from './LeaderboardItem'

const meta = {
  title: 'Leaderboard/LeaderboardItem',
  component: LeaderboardItem,
  decorators: [
    (Story) => <ol className='leaderboard-list'><Story /></ol>
  ]
}

export default meta

export const FirstPlace = {
  args: {
    rank: 1,
    item: {
      user: {
        name: 'Nadia Pratama',
        avatar: 'https://ui-avatars.com/api/?name=Nadia+Pratama'
      },
      score: 245
    }
  }
}

export const FourthPlace = {
  args: {
    rank: 4,
    item: {
      user: {
        name: 'Aulia Ramadhan',
        avatar: 'https://ui-avatars.com/api/?name=Aulia+Ramadhan'
      },
      score: 118
    }
  }
}
