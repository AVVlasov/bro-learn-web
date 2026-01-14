import { lazy } from 'react'

export const MainPage = lazy(() => import(/* webpackChunkName: 'main' */'./main'))
export const ModulePage = lazy(() => import(/* webpackChunkName: 'module' */'./module'))
export const LessonPage = lazy(() => import(/* webpackChunkName: 'lesson' */'./lesson'))