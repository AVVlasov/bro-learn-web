import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { URLs } from './__data__/urls'
import { MainPage, ModulePage, LessonPage } from './pages'
import { AppLayout } from './components/layout/AppLayout'
import { LoadingSpinner } from './components/common/LoadingSpinner'

const PageWrapper = ({ children }: React.PropsWithChildren) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
)

export const Dashboard = () => {
  return (
    <AppLayout>
      <Routes>
        <Route
          path={URLs.baseUrl}
          element={
            <PageWrapper>
              <MainPage />
            </PageWrapper>
          }
        />
        <Route
          path={`${URLs.baseUrl}/modules/:moduleId`}
          element={
            <PageWrapper>
              <ModulePage />
            </PageWrapper>
          }
        />
        <Route
          path={`${URLs.baseUrl}/lessons/:lessonId`}
          element={
            <PageWrapper>
              <LessonPage />
            </PageWrapper>
          }
        />
      </Routes>
    </AppLayout>
  )
}
