import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as api from '../lib/blogApi'

const BlogContext = createContext(null)

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const list = await api.fetchPosts()
      setPosts(list)
    } catch (err) {
      setError(err.message || 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const publishedPosts = useMemo(
    () =>
      posts
        .filter((p) => p.status === 'published')
        .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0)),
    [posts],
  )

  const getBySlug = useCallback(
    (slug) => posts.find((p) => p.slug === slug) || null,
    [posts],
  )

  const createPost = useCallback(
    async (payload) => {
      const post = await api.createPost(payload)
      await refresh()
      return post
    },
    [refresh],
  )

  const updatePost = useCallback(
    async (id, payload) => {
      const post = await api.updatePost(id, payload)
      await refresh()
      return post
    },
    [refresh],
  )

  const removePost = useCallback(
    async (id) => {
      await api.deletePost(id)
      await refresh()
    },
    [refresh],
  )

  const value = useMemo(
    () => ({
      posts,
      publishedPosts,
      loading,
      error,
      refresh,
      getBySlug,
      createPost,
      updatePost,
      removePost,
    }),
    [posts, publishedPosts, loading, error, refresh, getBySlug, createPost, updatePost, removePost],
  )

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}

export function useBlogs() {
  const ctx = useContext(BlogContext)
  if (!ctx) throw new Error('useBlogs must be used within BlogProvider')
  return ctx
}
