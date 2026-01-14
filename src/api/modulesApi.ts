import { baseApi } from './baseApi'
import type { ModulesResponse, ModuleDetailResponse } from '../types/api.types'

export const modulesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getModules: builder.query<ModulesResponse, void>({
      query: () => '/modules',
      providesTags: ['Modules'],
    }),
    getModuleById: builder.query<ModuleDetailResponse, string>({
      query: (moduleId) => `/modules/${moduleId}`,
      providesTags: (result, error, moduleId) => [
        { type: 'Modules', id: moduleId },
        'Lessons',
      ],
    }),
  }),
})

export const { useGetModulesQuery, useGetModuleByIdQuery } = modulesApi
