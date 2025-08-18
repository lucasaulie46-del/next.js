import { nextTestSetup } from 'e2e-utils'

describe('metadata-basepath', () => {
  const { next } = nextTestSetup({
    files: __dirname,
  })

  it('should include basepath in favicon URL', async () => {
    const $ = await next.render$('/docs')
    const faviconLink = $('link[rel="icon"]')
    const href = faviconLink.attr('href')
    expect(href).toMatch(/^\/docs\/favicon\.ico/)
  })

  it('should serve favicon with basepath', async () => {
    const res = await next.fetch('/docs/favicon.ico')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('image/x-icon')
  })

  it('should include basepath in opengraph-image URL', async () => {
    const $ = await next.render$('/docs')
    const ogImage = $('meta[property="og:image"]')
    const content = ogImage.attr('content')
    expect(content).toMatch(/^\/docs\/opengraph-image/)
  })

  it('should include basepath in twitter-image URL', async () => {
    const $ = await next.render$('/docs')
    const twitterImage = $('meta[name="twitter:image"]')
    const content = twitterImage.attr('content')
    expect(content).toMatch(/^\/docs\/twitter-image/)
  })

  it('should include basepath in apple-icon URL', async () => {
    const $ = await next.render$('/docs')
    const appleIcon = $('link[rel="apple-touch-icon"]')
    const href = appleIcon.attr('href')
    expect(href).toMatch(/^\/docs\/apple-icon/)
  })

  it('should serve metadata routes with basepath', async () => {
    const routes = [
      '/docs/opengraph-image',
      '/docs/twitter-image',
      '/docs/apple-icon',
    ]

    for (const route of routes) {
      const res = await next.fetch(route)
      expect(res.status).toBe(200)
      expect(res.headers.get('content-type')).toMatch(/^image\//)
    }
  })

  it('should include basepath in page content', async () => {
    const $ = await next.render$('/')
    expect($('p').text()).toBe('hello world')
  })
})
