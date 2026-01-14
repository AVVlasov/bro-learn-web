import { baseApi } from './baseApi'
import type {
  ProgressResponse,
  LessonCompleteRequest,
  LessonCompleteResponse,
} from '../types/api.types'

export const progressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProgress: builder.query<ProgressResponse, void>({
      query: () => '/progress',
      providesTags: ['Progress'],
    }),
    completeLesson: builder.mutation<
      LessonCompleteResponse,
      { lessonId: string; data: LessonCompleteRequest }
    >({
      query: ({ lessonId, data }) => ({
        url: `/progress/lessons/${lessonId}/complete`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Progress', 'Modules', 'Lessons'],
    }),
    completeExercise: builder.mutation<
      { success: boolean },
      { exerciseId: string; isCorrect: boolean; attempts: number }
    >({
      query: ({ exerciseId, isCorrect, attempts }) => ({
        url: `/progress/exercises/${exerciseId}/complete`,
        method: 'POST',
        body: { isCorrect, attempts },
      }),
      invalidatesTags: ['Progress'],
    }),
  }),
})

export const {
  useGetProgressQuery,
  useCompleteLessonMutation,
  useCompleteExerciseMutation,
} = progressApi
