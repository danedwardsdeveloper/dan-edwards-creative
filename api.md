# Front-end

```ts
const handler: NextApiHandler<ApiEndpoints['/api/posts/[id]']['GET']['response']> = async (req, res) => {
const { id } = req.query as ApiEndpoints['/api/posts/[id]']['GET']['params']
Handle request...
}
```

# Back - end

```ts
async function fetchPosts(page: number) {
  const response = await fetch(`/api/posts?page=${page}`)
  const data: ApiEndpoints['/api/posts']['GET']['response'] = await response.json()
  return data
}
```

1. ~~/api/admin-exclude~~
2. /api/analytics/link-clicks
3. /api/analytics/page-views
4. /api/subscriptions/add
5. /api/subscriptions/all
6. ~~/api/subscriptions/confirm~~
7. /api/subscriptions/encode-email
8. /api/subscriptions/resend
9. /api/subscriptions/send-email-to-myself
10. /api/subscriptions/unsubscribe
