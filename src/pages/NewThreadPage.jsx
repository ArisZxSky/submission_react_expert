import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/common/Button'
import Icon from '../components/icons/Icon'
import { asyncCreateThread } from '../states/threads/slice'
import { showToast } from '../states/ui/slice'

function NewThreadPage () {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')
  const createStatus = useSelector((state) => state.threads.createStatus)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const thread = await dispatch(asyncCreateThread({
        title: title.trim(),
        category: category.trim().replace(/^#/, '') || 'umum',
        body: body.trim()
      })).unwrap()
      dispatch(showToast({ type: 'success', message: 'Diskusi baru berhasil diterbitkan.' }))
      navigate(`/threads/${thread.id}`)
    } catch (error) {
      dispatch(showToast({ type: 'error', message: error }))
    }
  }

  return (
    <div className='compose-page container'>
      <Link className='back-link' to='/'>
        <Icon name='arrowLeft' size={18} /> Batalkan dan kembali
      </Link>

      <div className='compose-layout'>
        <section className='compose-card'>
          <div className='compose-card__heading'>
            <span><Icon name='spark' size={16} /> Mulai percakapan</span>
            <h1>Bagikan hal yang sedang kamu pikirkan.</h1>
            <p>Judul yang jelas dan konteks yang cukup akan membantu orang lain memberi tanggapan terbaik.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='form-field'>
              <label htmlFor='thread-title'>Judul diskusi</label>
              <input
                id='thread-title'
                type='text'
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder='Contoh: Bagaimana cara menjaga konsistensi belajar React?'
                minLength={5}
                required
              />
              <small>{title.length}/100 karakter</small>
            </div>

            <div className='form-field'>
              <label htmlFor='thread-category'>Kategori</label>
              <input
                id='thread-category'
                type='text'
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder='Contoh: react, karier, pengalaman'
                required
              />
              <small>Gunakan satu kategori yang paling relevan.</small>
            </div>

            <div className='form-field'>
              <label htmlFor='thread-body'>Isi diskusi</label>
              <textarea
                id='thread-body'
                rows='10'
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder='Berikan konteks, apa yang sudah kamu coba, dan hal yang ingin kamu diskusikan…'
                minLength={10}
                required
              />
              <small>{body.length} karakter</small>
            </div>

            <div className='compose-card__actions'>
              <Link className='button button--secondary' to='/'>Batal</Link>
              <Button type='submit' icon='send' disabled={createStatus === 'loading'}>
                {createStatus === 'loading' ? 'Menerbitkan…' : 'Terbitkan diskusi'}
              </Button>
            </div>
          </form>
        </section>

        <aside className='compose-tips'>
          <div className='compose-tips__icon'><Icon name='spark' size={27} /></div>
          <h2>Diskusi yang baik dimulai dari…</h2>
          <ol>
            <li><span>01</span><div><strong>Judul yang spesifik</strong><p>Ringkas inti pembahasan dalam satu kalimat.</p></div></li>
            <li><span>02</span><div><strong>Konteks yang cukup</strong><p>Ceritakan situasi agar pembaca mudah memahami.</p></div></li>
            <li><span>03</span><div><strong>Sikap saling menghargai</strong><p>Gunakan bahasa yang ramah dan terbuka.</p></div></li>
          </ol>
        </aside>
      </div>
    </div>
  )
}

export default NewThreadPage
