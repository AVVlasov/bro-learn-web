import { baseApi } from './baseApi'
import type { LessonResponse } from '../types/api.types'

export const lessonsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonById: builder.query<LessonResponse, string>({
      query: (lessonId) => `/lessons/${lessonId}`,
      providesTags: (result, error, lessonId) => [
        { type: 'Lessons', id: lessonId },
      ],
    }),
  }),
})

export const { useGetLessonByIdQuery } = lessonsApi
