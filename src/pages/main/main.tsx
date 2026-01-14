import React from 'react'
import { Box, VStack, Text, Flex } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { useGetModulesQuery } from '../../api/modulesApi'
import { useGetProgressQuery } from '../../api/progressApi'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { LearningPath } from '../../components/learning/LearningPath'
import { URLs } from '../../__data__/urls'

// Animation for mascot
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

// Duo-style Mascot (Robot for LLM learning)
const Mascot: React.FC<{ message?: string }> = ({ message }) => (
  <Flex
    direction="column"
    align="center"
    gap={3}
    p={6}
    bg="bg.surface"
    borderRadius="duo.xl"
    border="2px solid"
    borderColor="border.default"
    mb={6}
  >
    {/* Robot Mascot SVG */}
    <Box animation={`${bounce} 2s ease-in-out infinite`}>
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        {/* Head */}
        <rect x="15" y="15" width="50" height="45" rx="10" fill="#58CC02" />
        <rect x="18" y="18" width="44" height="39" rx="8" fill="#89E219" />
        
        {/* Eyes */}
        <ellipse cx="30" cy="35" rx="8" ry="10" fill="white" />
        <ellipse cx="50" cy="35" rx="8" ry="10" fill="white" />
        <circle cx="32" cy="37" r="4" fill="#1A1A1A" />
        <circle cx="52" cy="37" r="4" fill="#1A1A1A" />
        <circle cx="33" cy="36" r="1.5" fill="white" />
        <circle cx="53" cy="36" r="1.5" fill="white" />
        
        {/* Antenna */}
        <rect x="37" y="5" width="6" height="12" rx="3" fill="#58CC02" />
        <circle cx="40" cy="5" r="5" fill="#FFC800" />
        
        {/* Mouth/Speaker */}
        <rect x="28" y="48" width="24" height="8" rx="4" fill="#1CB0F6" />
        <rect x="30" y="50" width="4" height="4" rx="1" fill="white" opacity="0.5" />
        <rect x="36" y="50" width="4" height="4" rx="1" fill="white" opacity="0.5" />
        <rect x="42" y="50" width="4" height="4" rx="1" fill="white" opacity="0.5" />
        
        {/* Body */}
        <rect x="25" y="62" width="30" height="15" rx="5" fill="#58CC02" />
        <circle cx="32" cy="69" r="3" fill="#89E219" />
        <circle cx="40" cy="69" r="3" fill="#FFC800" />
        <circle cx="48" cy="69" r="3" fill="#1CB0F6" />
      </svg>
    </Box>

    {/* Speech bubble */}
    {message && (
      <Box
        position="relative"
        bg="bg.muted"
        borderRadius="duo.lg"
        p={4}
        maxW="300px"
        _before={{
          content: '""',
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '10px solid',
          borderBottomColor: 'bg.muted',
        }}
      >
        <Text
          fontSize="md"
          fontWeight="600"
          color="fg.default"
          textAlign="center"
        >
          {message}
        </Text>
      </Box>
    )}
  </Flex>
)

// Stats Card Component
const StatsCard: React.FC<{
  icon: React.ReactNode
  value: number | string
  label: string
  color: string
}> = ({ icon, value, label, color }) => (
  <Box
    bg="bg.surface"
    borderRadius="duo.lg"
    border="2px solid"
    borderColor="border.default"
    p={4}
    textAlign="center"
    transition="all 0.2s"
    _hover={{
      borderColor: color,
      transform: 'translateY(-2px)',
    }}
  >
    <Flex justify="center" mb={2}>
      {icon}
    </Flex>
    <Text fontSize="2xl" fontWeight="800" color={color}>
      {value}
    </Text>
    <Text fontSize="xs" fontWeight="600" color="fg.muted">
      {label}
    </Text>
  </Box>
)

export const MainPage = () => {
  const navigate = useNavigate()
  const {
    data: modulesData,
    isLoading: modulesLoading,
    error: modulesError,
    refetch: refetchModules,
  } = useGetModulesQuery()
  const { data: progressData, isLoading: progressLoading } = useGetProgressQuery()

  if (modulesLoading || progressLoading) {
    return <LoadingSpinner message="Загрузка курса..." />
  }

  if (modulesError || !modulesData) {
    return (
      <ErrorMessage
        message="Не удалось загрузить курс"
        onRetry={refetchModules}
      />
    )
  }

  const modules = modulesData.modules
  const progress = progressData?.progress
  const completedLessonIds = progress?.completedLessons.map((l) => l.lessonId) || []
  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)
  const completedLessonsCount = completedLessonIds.length

  // Determine greeting message
  const getGreetingMessage = () => {
    if (completedLessonsCount === 0) {
      return 'Привет! Я BroBot 🤖 Готов научить тебя работать с AI!'
    }
    if (progress?.currentStreak && progress.currentStreak > 0) {
      return `Отлично! ${progress.currentStreak} ${getDaysWord(progress.currentStreak)} подряд! 🔥`
    }
    return 'Продолжаем обучение! Ты отлично справляешься! 💪'
  }

  const getDaysWord = (days: number) => {
    if (days === 1) return 'день'
    if (days >= 2 && days <= 4) return 'дня'
    return 'дней'
  }

  return (
    <VStack align="stretch" gap={6}>
      {/* Mascot with greeting */}
      <Mascot message={getGreetingMessage()} />

      {/* Quick Stats */}
      {progress && (
        <Flex gap={3} justify="center" flexWrap="wrap">
          <StatsCard
            icon={
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 4C16 4 8 12 8 18C8 24 11 28 16 28C21 28 24 24 24 18C24 12 16 4 16 4Z"
                  fill="#FF9600"
                />
                <path
                  d="M16 12C16 12 12 16 12 20C12 24 14 26 16 26C18 26 20 24 20 20C20 16 16 12 16 12Z"
                  fill="#FFC800"
                />
              </svg>
            }
            value={progress.currentStreak}
            label="Streak"
            color="duo.streak"
          />
          <StatsCard
            icon={
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 2L20 12H30L22 18L26 28L16 22L6 28L10 18L2 12H12L16 2Z"
                  fill="#FFC800"
                />
              </svg>
            }
            value={progress.totalXP}
            label="Всего XP"
            color="duo.accent"
          />
          <StatsCard
            icon={
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="8" width="24" height="18" rx="3" fill="#58CC02" />
                <path d="M4 11L16 18L28 11" stroke="#89E219" strokeWidth="2" />
                <path
                  d="M8 14L12 18L22 10"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            value={`${completedLessonsCount}/${totalLessons}`}
            label="Уроков"
            color="duo.primary"
          />
        </Flex>
      )}

      {/* Section Title */}
      <Box textAlign="center" py={4}>
        <Text
          fontSize="xs"
          fontWeight="800"
          color="duo.primary"
          textTransform="uppercase"
          letterSpacing="2px"
          mb={2}
        >
          Путь обучения
        </Text>
        <Text fontSize="lg" fontWeight="700" color="fg.default">
          Изучите основы работы с AI
        </Text>
      </Box>

      {/* Learning Path */}
      <LearningPath
        modules={modules}
        completedLessonIds={completedLessonIds}
        onLessonClick={(lessonId) => navigate(`${URLs.baseUrl}/lessons/${lessonId}`)}
        onModuleClick={(moduleId) => navigate(`${URLs.baseUrl}/modules/${moduleId}`)}
      />
    </VStack>
  )
}
