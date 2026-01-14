import React from 'react'
import { VStack, Heading, Text, Box, Flex } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetModuleByIdQuery } from '../../api/modulesApi'
import { useGetProgressQuery } from '../../api/progressApi'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { URLs } from '../../__data__/urls'
import { getIconEmoji } from '../../utils/iconMapper'

// Animation keyframes
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(88, 204, 2, 0.4); }
  50% { box-shadow: 0 0 35px rgba(88, 204, 2, 0.7); }
`

// Back Button Component
const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Flex
    as="button"
    align="center"
    gap={2}
    px={4}
    py={2}
    bg="bg.surface"
    borderRadius="duo.md"
    border="2px solid"
    borderColor="border.default"
    cursor="pointer"
    transition="all 0.2s"
    _hover={{
      borderColor: 'duo.secondary',
      transform: 'translateX(-4px)',
    }}
    onClick={onClick}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M12 4L6 10L12 16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <Text fontSize="sm" fontWeight="700" color="fg.default">
      Назад
    </Text>
  </Flex>
)

// Checkmark Icon
const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M6 14L12 20L22 8"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Lock Icon
const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="10" width="14" height="12" rx="2" fill="#777" />
    <path
      d="M8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10"
      stroke="#777"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16" r="2" fill="#AFAFAF" />
  </svg>
)

// Star Icon for active
const StarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M14 2L17 10H25L19 15L21 24L14 19L7 24L9 15L3 10H11L14 2Z"
      fill="white"
    />
  </svg>
)

// Lesson Node Component
const LessonNode: React.FC<{
  lesson: {
    id: string
    title: string
    xpReward: number
    estimatedMinutes: number
  }
  index: number
  status: 'completed' | 'active' | 'locked'
  onClick: () => void
  position: 'left' | 'center' | 'right'
  showConnector: boolean
}> = ({ lesson, index, status, onClick, position, showConnector }) => {
  const getNodeStyles = () => {
    switch (status) {
      case 'completed':
        return {
          bg: 'linear-gradient(180deg, #FFC800 0%, #FF9600 100%)',
          border: '4px solid #FFC800',
          shadow: '0 6px 0 #CC7700, 0 8px 20px rgba(255, 200, 0, 0.3)',
        }
      case 'active':
        return {
          bg: 'linear-gradient(180deg, #58CC02 0%, #58A700 100%)',
          border: '4px solid #58CC02',
          shadow: '0 6px 0 #458600, 0 8px 20px rgba(88, 204, 2, 0.3)',
        }
      case 'locked':
      default:
        return {
          bg: 'linear-gradient(180deg, #4B4B4B 0%, #3C3C3C 100%)',
          border: '4px solid #4B4B4B',
          shadow: '0 6px 0 #2B2B2B',
        }
    }
  }

  const styles = getNodeStyles()
  const nodeSize = status === 'active' ? 80 : 70

  const getOffset = () => {
    switch (position) {
      case 'left':
        return '-40px'
      case 'right':
        return '40px'
      default:
        return '0'
    }
  }

  return (
    <VStack gap={2} position="relative">
      {/* Connector Line */}
      {showConnector && (
        <Box
          position="absolute"
          top="-40px"
          left="50%"
          transform="translateX(-50%)"
          w="4px"
          h="40px"
          bg={status === 'locked' ? 'border.default' : 'duo.primary'}
          borderRadius="full"
          opacity={status === 'locked' ? 0.5 : 1}
        />
      )}

      <Box
        position="relative"
        transform={`translateX(${getOffset()})`}
        transition="all 0.3s"
      >
        {/* Lesson Number Badge */}
        <Flex
          position="absolute"
          top="-8px"
          right="-8px"
          w="28px"
          h="28px"
          borderRadius="full"
          bg={status === 'locked' ? 'bg.muted' : 'bg.surface'}
          border="3px solid"
          borderColor={status === 'locked' ? 'border.default' : 'duo.primary'}
          align="center"
          justify="center"
          zIndex={2}
        >
          <Text
            fontSize="xs"
            fontWeight="800"
            color={status === 'locked' ? 'fg.muted' : 'fg.default'}
          >
            {index + 1}
          </Text>
        </Flex>

        {/* Node Button */}
        <Flex
          as="button"
          w={`${nodeSize}px`}
          h={`${nodeSize}px`}
          borderRadius="full"
          bg={styles.bg}
          border={styles.border}
          boxShadow={styles.shadow}
          align="center"
          justify="center"
          cursor={status === 'locked' ? 'not-allowed' : 'pointer'}
          transition="all 0.2s"
          animation={status === 'active' ? `${pulse} 2s infinite, ${glow} 2s infinite` : undefined}
          _hover={
            status !== 'locked'
              ? {
                  transform: 'translateY(-4px)',
                }
              : undefined
          }
          _active={
            status !== 'locked'
              ? {
                  transform: 'translateY(4px)',
                  boxShadow: '0 2px 0 #458600',
                }
              : undefined
          }
          onClick={status !== 'locked' ? onClick : undefined}
        >
          {status === 'completed' && <CheckIcon />}
          {status === 'active' && <StarIcon />}
          {status === 'locked' && <LockIcon />}
        </Flex>

        {/* XP Badge */}
        {status !== 'locked' && (
          <Flex
            position="absolute"
            bottom="-8px"
            left="50%"
            transform="translateX(-50%)"
            bg="duo.accent"
            color="black"
            px={2}
            py={0.5}
            borderRadius="duo.full"
            fontSize="xs"
            fontWeight="800"
            boxShadow="0 2px 4px rgba(0,0,0,0.2)"
          >
            +{lesson.xpReward} XP
          </Flex>
        )}
      </Box>

      {/* Title */}
      <Text
        fontSize="sm"
        fontWeight="700"
        color={status === 'locked' ? 'fg.subtle' : 'fg.default'}
        textAlign="center"
        maxW="120px"
        transform={`translateX(${getOffset()})`}
        opacity={status === 'locked' ? 0.6 : 1}
        mt={2}
      >
        {lesson.title}
      </Text>

      {/* Duration */}
      <Text
        fontSize="xs"
        color="fg.subtle"
        transform={`translateX(${getOffset()})`}
      >
        ⏱ {lesson.estimatedMinutes} мин
      </Text>
    </VStack>
  )
}

export const ModulePage = () => {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()

  const {
    data: moduleData,
    isLoading,
    error,
    refetch,
  } = useGetModuleByIdQuery(moduleId!)
  const { data: progressData } = useGetProgressQuery()

  if (isLoading) {
    return <LoadingSpinner message="Загрузка модуля..." />
  }

  if (error || !moduleData) {
    return (
      <ErrorMessage message="Не удалось загрузить модуль" onRetry={refetch} />
    )
  }

  const { module } = moduleData
  const lessons = module.lessons || []
  const progress = progressData?.progress
  const completedLessonIds = progress?.completedLessons.map((l) => l.lessonId) || []

  const getLessonStatus = (lesson: any, index: number): 'completed' | 'active' | 'locked' => {
    if (completedLessonIds.includes(lesson.id)) return 'completed'
    if (index === 0) return 'active'
    if (completedLessonIds.includes(lessons[index - 1].id)) return 'active'
    return 'locked'
  }

  const positions: Array<'left' | 'center' | 'right'> = ['center', 'right', 'center', 'left']
  const completedCount = lessons.filter((l) => completedLessonIds.includes(l.id)).length
  const progressPercent = (completedCount / lessons.length) * 100

  return (
    <VStack align="stretch" gap={6}>
      {/* Back Button */}
      <BackButton onClick={() => navigate(URLs.baseUrl)} />

      {/* Module Header */}
      <Box
        bg="bg.surface"
        borderRadius="duo.xl"
        border="2px solid"
        borderColor="duo.primary"
        p={6}
        textAlign="center"
      >
        <Text fontSize="5xl" mb={3}>
          {getIconEmoji(module.icon)}
        </Text>
        <Heading
          size={{ base: 'lg', md: 'xl' }}
          color="fg.default"
          fontWeight="800"
          mb={2}
        >
          {module.title}
        </Heading>
        <Text fontSize="sm" color="fg.muted" mb={4}>
          {module.description}
        </Text>

        {/* Progress Bar */}
        <Box mb={3}>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="xs" fontWeight="700" color="fg.muted">
              Прогресс
            </Text>
            <Text fontSize="xs" fontWeight="700" color="duo.primary">
              {completedCount}/{lessons.length}
            </Text>
          </Flex>
          <Box
            h="12px"
            bg="bg.muted"
            borderRadius="duo.full"
            overflow="hidden"
          >
            <Box
              h="100%"
              w={`${progressPercent}%`}
              bgGradient="linear(to-r, #58CC02, #89E219)"
              borderRadius="duo.full"
              transition="width 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
            />
          </Box>
        </Box>

        {/* Reward */}
        <Flex
          justify="center"
          align="center"
          gap={2}
          p={3}
          bg="bg.muted"
          borderRadius="duo.md"
        >
          <Text fontSize="lg">🏆</Text>
          <Text fontSize="sm" fontWeight="700" color="fg.default">
            Награда за модуль:
          </Text>
          <Flex align="center" gap={1}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 1L12.5 7H19L14 11L16 18L10 14L4 18L6 11L1 7H7.5L10 1Z"
                fill="#FFC800"
              />
            </svg>
            <Text fontSize="sm" fontWeight="800" color="duo.accent">
              {module.xpReward} XP
            </Text>
          </Flex>
        </Flex>
      </Box>

      {/* Lessons Path */}
      <Box py={6}>
        <Text
          fontSize="xs"
          fontWeight="800"
          color="duo.primary"
          textTransform="uppercase"
          letterSpacing="2px"
          textAlign="center"
          mb={6}
        >
          Уроки ({lessons.length})
        </Text>

        <VStack gap={10} align="center">
          {lessons.map((lesson, index) => (
            <LessonNode
              key={lesson.id}
              lesson={lesson}
              index={index}
              status={getLessonStatus(lesson, index)}
              onClick={() => navigate(`${URLs.baseUrl}/lessons/${lesson.id}`)}
              position={positions[index % positions.length]}
              showConnector={index > 0}
            />
          ))}

          {/* Treasure Chest */}
          <VStack gap={2} pt={4}>
            <Flex
              w="70px"
              h="70px"
              borderRadius="duo.lg"
              bg={
                completedCount === lessons.length
                  ? 'linear-gradient(180deg, #FFC800 0%, #FF9600 100%)'
                  : 'linear-gradient(180deg, #4B4B4B 0%, #3C3C3C 100%)'
              }
              border="4px solid"
              borderColor={completedCount === lessons.length ? '#FFC800' : '#4B4B4B'}
              boxShadow={
                completedCount === lessons.length
                  ? '0 6px 0 #CC7700'
                  : '0 6px 0 #2B2B2B'
              }
              align="center"
              justify="center"
            >
              <Text fontSize="3xl">
                {completedCount === lessons.length ? '🎁' : '🔒'}
              </Text>
            </Flex>
            <Text fontSize="sm" fontWeight="700" color="fg.muted">
              {completedCount === lessons.length
                ? 'Модуль завершён!'
                : 'Завершите все уроки'}
            </Text>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  )
}
