import { useState } from 'react'
import PropTypes from 'prop-types'
import Avatar from '../common/Avatar'
import Button from '../common/Button'

function CommentForm ({ authUser, isSubmitting, onSubmit }) {
  const [content, setContent] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedContent = content.trim()

    if (!trimmedContent) {
      return
    }

    const isSuccess = await onSubmit(trimmedContent)

    if (isSuccess) {
      setContent('')
    }
  }

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <Avatar name={authUser.name} src={authUser.avatar} size='medium' />
      <div className='comment-form__body'>
        <label htmlFor='comment-content'>Tambahkan tanggapan</label>
        <textarea
          id='comment-content'
          rows='4'
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder='Tulis pendapatmu dengan jelas dan tetap saling menghargai…'
          required
        />
        <div className='comment-form__actions'>
          <small>{content.trim().length} karakter</small>
          <Button type='submit' icon='send' disabled={isSubmitting || !content.trim()}>
            {isSubmitting ? 'Mengirim…' : 'Kirim tanggapan'}
          </Button>
        </div>
      </div>
    </form>
  )
}

CommentForm.propTypes = {
  authUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default CommentForm
