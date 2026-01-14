import { baseApi } from './baseApi'
import type {
  ExerciseResponse,
  ExerciseSubmitRequest,
  ExerciseSubmitResponse,
} from '../types/api.types'

export const exercisesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExerciseById: builder.query<ExerciseResponse, string>({
      query: (exerciseId) => `/exercises/${exerciseId}`,
      providesTags: (result, error, exerciseId) => [
        { type: 'Exercises', id: exerciseId },
      ],
    }),
    submitExercise: builder.mutation<
      ExerciseSubmitResponse,
      { exerciseId: string; data: ExerciseSubmitRequest }
    >({
      query: ({ exerciseId, data }) => ({
        url: `/exercises/${exerciseId}/submit`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Progress'],
    }),
  }),
})

export const { useGetExerciseByIdQuery, useSubmitExerciseMutation } =
  exercisesApi
