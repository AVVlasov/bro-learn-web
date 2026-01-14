import React, { useState } from 'react'
import { VStack, Heading, Text, Box, Flex } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetLessonByIdQuery } from '../../api/lessonsApi'
import {
  useGetExerciseByIdQuery,
  useSubmitExerciseMutation,
} from '../../api/exercisesApi'
import { useCompleteLessonMutation } from '../../api/progressApi'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { MultipleChoice } from '../../components/exercises/MultipleChoice'
import { TextInput } from '../../components/exercises/TextInput'
import { PromptFix } from '../../components/exercises/PromptFix'
import { ExerciseFeedback } from '../../components/exercises/ExerciseFeedback'
import { HintButton } from '../../components/exercises/HintButton'
import type { ExerciseSubmitResponse } from '../../types/api.types'
import { URLs } from '../../__data__/urls'

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

// Close Button (X)
const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Flex
    as="button"
    w="40px"
    h="40px"
    borderRadius="full"
    bg="bg.muted"
    border="2px solid"
    borderColor="border.default"
    align="center"
    justify="center"
    cursor="pointer"
    transition="all 0.2s"
    _hover={{
      borderColor: 'duo.error',
      bg: 'rgba(255, 75, 75, 0.1)',
    }}
    onClick={onClick}
  >
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M4 4L14 14M14 4L4 14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </Flex>
)

// Progress Bar Component
const ProgressBar: React.FC<{ current: number; total: number }> = ({
  current,
  total,
}) => {
  const progress = (current / total) * 100

  return (
    <Box flex={1} mx={4}>
      <Box
        h="14px"
        bg="bg.muted"
        borderRadius="duo.full"
        overflow="hidden"
        border="2px solid"
        borderColor="border.default"
      >
        <Box
          h="100%"
          w={`${progress}%`}
          bgGradient="linear(to-r, #58CC02, #89E219)"
          borderRadius="duo.full"
          transition="width 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          position="relative"
          _after={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            animation: 'shimmer 2s infinite',
          }}
        />
      </Box>
    </Box>
  )
}

// Hearts Display (placeholder - could show remaining attempts)
const HeartsDisplay: React.FC<{ hearts: number }> = ({ hearts }) => (
  <Flex align="center" gap={1}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21L10.55 19.7C5.4 15.1 2 12.1 2 8.5C2 5.4 4.4 3 7.5 3C9.2 3 10.9 3.8 12 5.1C13.1 3.8 14.8 3 16.5 3C19.6 3 22 5.4 22 8.5C22 12.1 18.6 15.1 13.45 19.7L12 21Z"
          fill={i < hearts ? '#FF4B4B' : '#3C3C3C'}
        />
      </svg>
    ))}
  </Flex>
)

// Continue Button (Duolingo style)
const ContinueButton: React.FC<{
  onClick: () => void
  isCorrect: boolean
  label: string
}> = ({ onClick, isCorrect, label }) => (
  <Flex
    as="button"
    w="full"
    py={4}
    px={6}
    borderRadius="duo.md"
    bg={isCorrect ? 'duo.primary' : 'duo.error'}
    boxShadow={isCorrect ? '0 4px 0 #458600' : '0 4px 0 #CC2B2B'}
    align="center"
    justify="center"
    cursor="pointer"
    transition="all 0.1s"
    _hover={{
      filter: 'brightness(1.1)',
    }}
    _active={{
      transform: 'translateY(4px)',
      boxShadow: 'none',
    }}
    onClick={onClick}
  >
    <Text
      fontSize="md"
      fontWeight="800"
      color="white"
      textTransform="uppercase"
      letterSpacing="1px"
    >
      {label}
    </Text>
  </Flex>
)

// Check Button
const CheckButton: React.FC<{
  onClick: () => void
  disabled: boolean
  isLoading: boolean
}> = ({ onClick, disabled, isLoading }) => (
  <Flex
    as="button"
    w="full"
    py={4}
    px={6}
    borderRadius="duo.md"
    bg={disabled ? '#4B4B4B' : '#58CC02'}
    boxShadow={disabled ? '0 4px 0 #2B2B2B' : '0 4px 0 #458600'}
    align="center"
    justify="center"
    cursor={disabled ? 'not-allowed' : 'pointer'}
    opacity={disabled ? 0.7 : 1}
    transition="all 0.1s"
    _hover={
      !disabled
        ? {
            filter: 'brightness(1.1)',
          }
        : undefined
    }
    _active={
      !disabled
        ? {
            transform: 'translateY(4px)',
            boxShadow: 'none',
          }
        : undefined
    }
    onClick={!disabled ? onClick : undefined}
  >
    <Text
      fontSize="md"
      fontWeight="800"
      color="white"
      textTransform="uppercase"
      letterSpacing="1px"
    >
      {isLoading ? 'Проверяем...' : 'Проверить'}
    </Text>
  </Flex>
)

// Theory Card
const TheorySection: React.FC<{
  section: {
    heading: string
    body: string
    codeExamples?: Array<{ code: string; description?: string }>
    callouts?: Array<{ type: string; content: string }>
  }
}> = ({ section }) => (
  <Box
    bg="bg.surface"
    borderRadius="duo.lg"
    border="2px solid"
    borderColor="border.default"
    p={5}
    animation={`${fadeIn} 0.4s ease-out`}
  >
    <Heading size="md" color="fg.default" fontWeight="800" mb={3}>
      {section.heading}
    </Heading>
    <Text fontSize="md" color="fg.muted" whiteSpace="pre-wrap" lineHeight="1.7">
      {section.body}
    </Text>

    {section.codeExamples && section.codeExamples.length > 0 && (
      <VStack align="stretch" gap={3} mt={4}>
        {section.codeExamples.map((example, idx) => (
          <Box key={idx}>
            {example.description && (
              <Text fontSize="xs" color="fg.subtle" mb={2}>
                {example.description}
              </Text>
            )}
            <Box
              p={4}
              borderRadius="duo.md"
              bg="bg.muted"
              fontFamily="monospace"
              fontSize="sm"
              color="fg.default"
              overflowX="auto"
              border="2px solid"
              borderColor="border.default"
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{example.code}</pre>
            </Box>
          </Box>
        ))}
      </VStack>
    )}

    {section.callouts && section.callouts.length > 0 && (
      <VStack align="stretch" gap={2} mt={4}>
        {section.callouts.map((callout, idx) => (
          <Flex
            key={idx}
            p={3}
            bg="rgba(28, 176, 246, 0.1)"
            borderRadius="duo.md"
            borderLeft="4px solid"
            borderLeftColor="duo.secondary"
            align="flex-start"
            gap={2}
          >
            <Text fontSize="lg">💡</Text>
            <Text fontSize="sm" color="fg.default">
              {callout.content}
            </Text>
          </Flex>
        ))}
      </VStack>
    )}
  </Box>
)

export const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [showContent, setShowContent] = useState(true)
  const [exerciseResult, setExerciseResult] =
    useState<ExerciseSubmitResponse | null>(null)

  const {
    data: lessonData,
    isLoading: lessonLoading,
    error: lessonError,
    refetch: refetchLesson,
  } = useGetLessonByIdQuery(lessonId!)

  const currentExerciseId = lessonData?.lesson.exercises[currentExerciseIndex]
  const { data: exerciseData, isLoading: exerciseLoading } =
    useGetExerciseByIdQuery(currentExerciseId || '', {
      skip: !currentExerciseId,
    })

  const [submitExercise, { isLoading: isSubmitting }] = useSubmitExerciseMutation()
  const [completeLesson] = useCompleteLessonMutation()

  if (lessonLoading) {
    return <LoadingSpinner message="Загрузка урока..." />
  }

  if (lessonError || !lessonData) {
    return (
      <ErrorMessage message="Не удалось загрузить урок" onRetry={refetchLesson} />
    )
  }

  const { lesson } = lessonData
  const isLastExercise = currentExerciseIndex === lesson.exercises.length - 1

  const handleSubmitExercise = async (answer: any) => {
    if (!currentExerciseId) return

    try {
      const result = await submitExercise({
        exerciseId: currentExerciseId,
        data: {
          type: exerciseData!.exercise.type,
          ...answer,
        },
      }).unwrap()

      setExerciseResult(result)
    } catch (error) {
      console.error('Error submitting exercise:', error)
    }
  }

  const handleContinue = async () => {
    if (isLastExercise) {
      await completeLesson({
        lessonId: lesson.id,
        data: { score: 100, attempts: 1 },
      })
      navigate(`${URLs.baseUrl}/modules/${lesson.moduleId}`)
    } else {
      setCurrentExerciseIndex((prev) => prev + 1)
      setExerciseResult(null)
      setShowContent(false)
    }
  }

  // Theory View
  if (showContent) {
    return (
      <VStack align="stretch" gap={0} minH="100vh" position="relative">
        {/* Top Bar */}
        <Flex
          position="sticky"
          top="0"
          bg="bg.canvas"
          py={3}
          px={2}
          align="center"
          zIndex={10}
        >
          <CloseButton onClick={() => navigate(`${URLs.baseUrl}/modules/${lesson.moduleId}`)} />
          <ProgressBar current={0} total={lesson.exercises.length} />
        </Flex>

        {/* Content */}
        <VStack align="stretch" gap={4} p={4} flex={1}>
          {/* Lesson Title */}
          <Box textAlign="center" py={4}>
            <Text
              fontSize="xs"
              fontWeight="800"
              color="duo.secondary"
              textTransform="uppercase"
              letterSpacing="2px"
              mb={2}
            >
              Теория
            </Text>
            <Heading size="lg" color="fg.default" fontWeight="800">
              {lesson.title}
            </Heading>
            <Flex justify="center" gap={4} mt={2}>
              <Text fontSize="sm" color="fg.muted">
                ⏱ {lesson.estimatedMinutes} мин
              </Text>
              <Flex align="center" gap={1}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1L10 6H15L11 9L13 15L8 11L3 15L5 9L1 6H6L8 1Z"
                    fill="#FFC800"
                  />
                </svg>
                <Text fontSize="sm" fontWeight="700" color="duo.accent">
                  {lesson.xpReward} XP
                </Text>
              </Flex>
            </Flex>
          </Box>

          {/* Theory Sections */}
          {lesson.content.sections.map((section, idx) => (
            <TheorySection key={idx} section={section} />
          ))}
        </VStack>

        {/* Bottom Action */}
        <Box
          position="sticky"
          bottom={{ base: '80px', lg: '0' }}
          bg="bg.canvas"
          p={4}
          borderTop="2px solid"
          borderColor="border.default"
          zIndex={900}
        >
          <Flex
            as="button"
            w="full"
            py={4}
            px={6}
            borderRadius="duo.md"
            bg="duo.primary"
            boxShadow="0 4px 0 #458600"
            align="center"
            justify="center"
            cursor="pointer"
            transition="all 0.1s"
            _hover={{
              filter: 'brightness(1.1)',
            }}
            _active={{
              transform: 'translateY(4px)',
              boxShadow: 'none',
            }}
            onClick={() => setShowContent(false)}
          >
            <Text
              fontSize="md"
              fontWeight="800"
              color="white"
              textTransform="uppercase"
              letterSpacing="1px"
            >
              Начать упражнения
            </Text>
          </Flex>
        </Box>
      </VStack>
    )
  }

  // Exercise View
  if (exerciseLoading || !exerciseData) {
    return <LoadingSpinner message="Загрузка упражнения..." />
  }

  const { exercise } = exerciseData

  return (
    <VStack align="stretch" gap={0} minH="100vh" position="relative">
      {/* Top Bar */}
      <Flex
        position="sticky"
        top="0"
        bg="bg.canvas"
        py={3}
        px={2}
        align="center"
        zIndex={10}
      >
        <CloseButton onClick={() => setShowContent(true)} />
        <ProgressBar
          current={currentExerciseIndex + (exerciseResult ? 1 : 0)}
          total={lesson.exercises.length}
        />
        <HeartsDisplay hearts={5} />
      </Flex>

      {/* Exercise Content */}
      <VStack align="stretch" gap={4} p={4} flex={1} animation={`${fadeIn} 0.3s ease-out`}>
        {/* Question */}
        <Box textAlign="center" py={4}>
          <Text
            fontSize="xs"
            fontWeight="800"
            color="duo.secondary"
            textTransform="uppercase"
            letterSpacing="2px"
            mb={3}
          >
            Упражнение {currentExerciseIndex + 1} из {lesson.exercises.length}
          </Text>
          <Heading size="lg" color="fg.default" fontWeight="800" mb={2}>
            {exercise.question}
          </Heading>
          {exercise.instructions && (
            <Text fontSize="md" color="fg.muted">
              {exercise.instructions}
            </Text>
          )}
        </Box>

        {/* Hints */}
        {!exerciseResult && exercise.hints && exercise.hints.length > 0 && (
          <HintButton hints={exercise.hints} />
        )}

        {/* Exercise Types */}
        {!exerciseResult && (
          <Box
            bg="bg.surface"
            borderRadius="duo.lg"
            border="2px solid"
            borderColor="border.default"
            p={5}
          >
            {exercise.type === 'multiple-choice' && (
              <MultipleChoice
                exercise={exercise}
                onSubmit={(selectedOptions) =>
                  handleSubmitExercise({ selectedOptions })
                }
                isSubmitting={isSubmitting}
              />
            )}
            {exercise.type === 'text-input' && (
              <TextInput
                exercise={exercise}
                onSubmit={(answer) => handleSubmitExercise({ answer })}
                isSubmitting={isSubmitting}
              />
            )}
            {exercise.type === 'prompt-fix' && (
              <PromptFix
                exercise={exercise}
                onSubmit={(improvedPrompt) =>
                  handleSubmitExercise({ improvedPrompt })
                }
                isSubmitting={isSubmitting}
              />
            )}
          </Box>
        )}

        {/* Feedback */}
        {exerciseResult && (
          <ExerciseFeedback result={exerciseResult} onContinue={handleContinue} />
        )}
      </VStack>

      {/* Bottom Action - only when result shown */}
      {exerciseResult && (
        <Box
          position="sticky"
          bottom={{ base: '80px', lg: '0' }}
          bg={exerciseResult.correct ? 'bg.success' : 'bg.error'}
          p={4}
          borderTop="2px solid"
          borderColor={exerciseResult.correct ? 'duo.success' : 'duo.error'}
          zIndex={900}
        >
          <ContinueButton
            onClick={handleContinue}
            isCorrect={exerciseResult.correct}
            label={isLastExercise ? 'Завершить урок' : 'Продолжить'}
          />
        </Box>
      )}
    </VStack>
  )
}
