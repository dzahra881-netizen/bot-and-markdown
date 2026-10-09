import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Spinner } from '@/components/common/Spinner'

// Lazy-loaded routes for code splitting
const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })))
const PostDetail = lazy(() => import('@/pages/PostDetail').then(m => ({ default: m.PostDetail })))
const Tags = lazy(() => import('@/pages/Tags').then(m => ({ default: m.Tags })))
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })))

function SuspenseFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'posts/:slug',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <PostDetail />
          </Suspense>
        ),
      },
      {
        path: 'tags',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <Tags />
          </Suspense>
        ),
      },
      {
        path: 'tags/:tag',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <Tags />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
