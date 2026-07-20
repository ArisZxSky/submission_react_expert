const API_BASE_URL = 'https://forum-api.dicoding.dev/v1'
const ACCESS_TOKEN_KEY = 'ruangkata-access-token'

function putAccessToken (token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

function getAccessToken () {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function removeAccessToken () {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

async function fetchWithAuth (url, options = {}) {
  const token = getAccessToken()
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  let responseJson

  try {
    responseJson = await response.json()
  } catch {
    throw new Error('Respons server tidak dapat dibaca.')
  }

  if (!response.ok || responseJson.status !== 'success') {
    throw new Error(responseJson.message || 'Terjadi kesalahan saat menghubungi server.')
  }

  return responseJson
}

async function register ({ name, email, password }) {
  const response = await fetchWithAuth(`${API_BASE_URL}/register`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  })

  return response.data.user
}

async function login ({ email, password }) {
  const response = await fetchWithAuth(`${API_BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })

  return response.data.token
}

async function getOwnProfile () {
  const response = await fetchWithAuth(`${API_BASE_URL}/users/me`)
  return response.data.user
}

async function getAllUsers () {
  const response = await fetchWithAuth(`${API_BASE_URL}/users`)
  return response.data.users
}

async function getAllThreads () {
  const response = await fetchWithAuth(`${API_BASE_URL}/threads`)
  return response.data.threads
}

async function getThreadDetail (threadId) {
  const response = await fetchWithAuth(`${API_BASE_URL}/threads/${threadId}`)
  return response.data.detailThread || response.data.thread
}

async function createThread ({ title, body, category }) {
  const response = await fetchWithAuth(`${API_BASE_URL}/threads`, {
    method: 'POST',
    body: JSON.stringify({ title, body, category })
  })

  return response.data.thread || response.data.addedThread
}

async function getLeaderboards () {
  const response = await fetchWithAuth(`${API_BASE_URL}/leaderboards`)
  return response.data.leaderboards
}

async function createComment ({ threadId, content }) {
  const response = await fetchWithAuth(`${API_BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content })
  })

  return response.data.comment || response.data.addedComment
}

async function voteThread ({ threadId, voteType }) {
  return fetchWithAuth(`${API_BASE_URL}/threads/${threadId}/${voteType}-vote`, {
    method: 'POST'
  })
}

async function voteComment ({ threadId, commentId, voteType }) {
  return fetchWithAuth(
    `${API_BASE_URL}/threads/${threadId}/comments/${commentId}/${voteType}-vote`,
    { method: 'POST' }
  )
}

const api = {
  putAccessToken,
  getAccessToken,
  removeAccessToken,
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  getThreadDetail,
  createThread,
  getLeaderboards,
  createComment,
  voteThread,
  voteComment
}

export default api
