import { expect, test } from '@playwright/test'

/*
Skenario pengujian End-to-End login:
1. Pengguna membuka halaman login.
2. Pengguna mengisi email dan password yang valid.
3. Pengguna menekan tombol masuk.
4. Aplikasi menyimpan access token, berpindah ke beranda, dan menampilkan identitas pengguna.
*/

test('user should be able to login and return to the home page', async ({ page }) => {
  const user = {
    id: 'user-e2e',
    name: 'Aulia Reviewer',
    email: 'aulia@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Aulia+Reviewer'
  }

  await page.route('https://forum-api.dicoding.dev/v1/**', async (route) => {
    const request = route.request()
    const url = new URL(request.url())
    const pathname = url.pathname

    if (pathname.endsWith('/login') && request.method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          message: 'ok',
          data: {
            token: 'token-e2e'
          }
        })
      })
      return
    }

    if (pathname.endsWith('/users/me')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          message: 'ok',
          data: {
            user
          }
        })
      })
      return
    }

    if (pathname.endsWith('/users')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          message: 'ok',
          data: {
            users: [user]
          }
        })
      })
      return
    }

    if (pathname.endsWith('/threads')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          message: 'ok',
          data: {
            threads: []
          }
        })
      })
      return
    }

    await route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'fail',
        message: 'Endpoint pengujian tidak ditemukan.'
      })
    })
  })

  await page.goto('/login')

  await page.getByLabel('Alamat email').fill('aulia@example.com')
  await page.locator('#login-password').fill('rahasia123')
  await page.getByRole('button', { name: 'Masuk ke RuangKata' }).click()

  await expect(page).toHaveURL('http://127.0.0.1:4173/')
  await expect(page.getByRole('heading', { name: 'Aulia Reviewer' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Keluar/i })).toBeVisible()

  const token = await page.evaluate(() => localStorage.getItem('ruangkata-access-token'))
  expect(token).toBe('token-e2e')
})
