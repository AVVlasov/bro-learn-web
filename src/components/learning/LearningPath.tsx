import React from 'react'
import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { URLs } from '../../__data__/urls'
import { getIconEmoji } from '../../utils/iconMapper'

// Animation keyframes
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(88, 204, 2, 0.4); }
  50% { box-shadow: 0 0 30px rgba(88, 204, 2, 0.6); }
`

interface Lesson {
  id: string
  title: string
  xpReward: number
  estimatedMinutes: number
}

interface Module {
  id: string
  title: string
  description: string
  icon: string
  lessons: Lesson[]
  xpReward: number
}

interface LearningPathProps {
  modules: Module[]
  completedLessonIds: string[]
  onLessonClick: (lessonId: string) => void
  onModuleClick: (moduleId: string) => void
}

type NodeStatus = 'completed' | 'active' | 'locked'

interface PathNodeProps {
  title: string
  icon: string
  status: NodeStatus
  progress?: number
  xp?: number
  onClick: () => void
  position: 'left' | 'center' | 'right'
  showConnector?: boolean
  isLast?: boolean
}

// Checkmark Icon
const CheckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path
      d="M8 16L14 22L24 10"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Lock Icon
const LockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect
      x="7"
      y="12"
      width="14"
      height="12"
      rx="2"
      fill="#777777"
    />
    <path
      d="M10 12V9C10 6.79 11.79 5 14 5C16.21 5 18 6.79 18 9V12"
      stroke="#777777"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="14" cy="18" r="2" fill="#AFAFAF" />
  </svg>
)

// Star Icon for active
const StarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path
      d="M16 4L19 13H28L21 19L24 28L16 22L8 28L11 19L4 13H13L16 4Z"
      fill="white"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
)

// Progress Circle Component
const ProgressCircle: React.FC<{
  progress: number
  size: number
  strokeWidth: number
  color: string
}> = ({ progress, size, strokeWidth, color }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  )
}

// Path Node (Circle) Component
const PathNode: React.FC<PathNodeProps> = ({
  title,
  icon,
  status,
  progress = 0,
  xp,
  onClick,
  position,
  showConnector = true,
  isLast = false,
}) => {
  const navigate = useNavigate()

  const getNodeStyles = () => {
    switch (status) {
      case 'completed':
        return {
          bg: 'linear-gradient(180deg, #FFC800 0%, #FF9600 100%)',
          border: '4px solid #FFC800',
          shadow: '0 6px 0 #CC7700, 0 8px 20px rgba(255, 200, 0, 0.4)',
          cursor: 'pointer',
          hoverTransform: 'translateY(-4px)',
        }
      case 'active':
        return {
          bg: 'linear-gradient(180deg, #58CC02 0%, #58A700 100%)',
          border: '4px solid #58CC02',
          shadow: '0 6px 0 #458600, 0 8px 20px rgba(88, 204, 2, 0.4)',
          cursor: 'pointer',
          hoverTransform: 'translateY(-4px)',
          animation: `${glow} 2s infinite`,
        }
      case 'locked':
      default:
        return {
          bg: 'linear-gradient(180deg, #4B4B4B 0%, #3C3C3C 100%)',
          border: '4px solid #4B4B4B',
          shadow: '0 6px 0 #2B2B2B',
          cursor: 'not-allowed',
          hoverTransform: 'none',
        }
    }
  }

  const styles = getNodeStyles()
  const nodeSize = status === 'active' ? 90 : 80

  // Calculate horizontal offset for zigzag pattern
  const getOffset = () => {
    switch (position) {
      case 'left':
        return '-50px'
      case 'right':
        return '50px'
      default:
        return '0'
    }
  }

  return (
    <VStack gap={3} position="relative">
      {/* Connector Line */}
      {showConnector && (
        <Box
          position="absolute"
          top="-50px"
          left="50%"
          transform="translateX(-50%)"
          w="4px"
          h="50px"
          bg={status === 'locked' ? 'border.default' : 'duo.primary'}
          borderRadius="full"
          opacity={status === 'locked' ? 0.5 : 1}
        />
      )}

      {/* Main Node */}
      <Box
        position="relative"
        transform={`translateX(${getOffset()})`}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      >
        {/* Progress Ring for active node */}
        {status === 'active' && progress > 0 && (
          <Box
            position="absolute"
            top="-5px"
            left="-5px"
            zIndex={0}
          >
            <ProgressCircle
              progress={progress}
              size={nodeSize + 10}
              strokeWidth={6}
              color="#89E219"
            />
          </Box>
        )}

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
          cursor={styles.cursor}
          transition="all 0.2s"
          position="relative"
          zIndex={1}
          animation={status === 'active' ? `${pulse} 2s infinite` : undefined}
          _hover={{
            transform: styles.hoverTransform,
          }}
          _active={{
            transform: status !== 'locked' ? 'translateY(4px)' : 'none',
            boxShadow: status !== 'locked' ? '0 2px 0 #458600' : styles.shadow,
          }}
          onClick={status !== 'locked' ? onClick : undefined}
        >
          {status === 'completed' && <CheckIcon />}
          {status === 'active' && (
            <Text fontSize="3xl">{icon || '🎯'}</Text>
          )}
          {status === 'locked' && <LockIcon />}
        </Flex>

        {/* XP Badge */}
        {xp && status !== 'locked' && (
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
            +{xp} XP
          </Flex>
        )}
      </Box>

      {/* Title */}
      <Text
        fontSize="sm"
        fontWeight="700"
        color={status === 'locked' ? 'fg.subtle' : 'fg.default'}
        textAlign="center"
        maxW="140px"
        transform={`translateX(${getOffset()})`}
        opacity={status === 'locked' ? 0.6 : 1}
      >
        {title}
      </Text>
    </VStack>
  )
}

// Section Header Component
const SectionHeader: React.FC<{
  title: string
  description: string
  moduleId: string
  isUnlocked: boolean
  onGuidebookClick?: () => void
}> = ({ title, description, moduleId, isUnlocked }) => {
  const navigate = useNavigate()

  return (
    <Box
      w="full"
      bg={isUnlocked ? 'bg.muted' : 'bg.surface'}
      borderRadius="duo.lg"
      border="2px solid"
      borderColor={isUnlocked ? 'duo.primary' : 'border.default'}
      p={4}
      mb={4}
      opacity={isUnlocked ? 1 : 0.7}
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Text
            fontSize="xs"
            fontWeight="800"
            color="duo.primary"
            textTransform="uppercase"
            letterSpacing="1px"
            mb={1}
          >
            {title}
          </Text>
          <Text fontSize="sm" color="fg.muted">
            {description}
          </Text>
        </Box>
        {isUnlocked && (
          <Flex
            as="button"
            align="center"
            gap={2}
            px={3}
            py={2}
            bg="bg.surface"
            borderRadius="duo.md"
            border="2px solid"
            borderColor="border.default"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
              borderColor: 'duo.secondary',
              bg: 'bg.muted',
            }}
            onClick={() => navigate(`${URLs.baseUrl}/modules/${moduleId}`)}
          >
            <Text fontSize="sm">📖</Text>
            <Text fontSize="sm" fontWeight="600" color="fg.default">
              Подробнее
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

// Main Learning Path Component
export const LearningPath: React.FC<LearningPathProps> = ({
  modules,
  completedLessonIds,
  onLessonClick,
  onModuleClick,
}) => {
  const navigate = useNavigate()

  // Determine status for each module
  const getModuleStatus = (module: Module, index: number): NodeStatus => {
    const lessons = module.lessons || []
    
    if (lessons.length === 0) {
      // No lessons - check if first module
      return index === 0 ? 'active' : 'locked'
    }
    
    const allLessonsCompleted = lessons.every((lesson) =>
      completedLessonIds.includes(lesson.id)
    )

    if (allLessonsCompleted) return 'completed'

    // First module or previous completed
    if (index === 0) return 'active'

    const prevModule = modules[index - 1]
    const prevLessons = prevModule.lessons || []
    
    if (prevLessons.length === 0) return 'active'
    
    const prevCompleted = prevLessons.every((lesson) =>
      completedLessonIds.includes(lesson.id)
    )

    if (prevCompleted) return 'active'

    return 'locked'
  }

  // Get progress percentage for a module
  const getModuleProgress = (module: Module): number => {
    const lessons = module.lessons || []
    if (lessons.length === 0) return 0
    
    const completedCount = lessons.filter((lesson) =>
      completedLessonIds.includes(lesson.id)
    ).length
    return (completedCount / lessons.length) * 100
  }

  // Positions for zigzag pattern
  const positions: Array<'left' | 'center' | 'right'> = [
    'center',
    'right',
    'center',
    'left',
    'center',
    'right',
  ]

  return (
    <VStack gap={8} align="center" py={6}>
      {modules.map((module, index) => {
        const status = getModuleStatus(module, index)
        const progress = getModuleProgress(module)
        const position = positions[index % positions.length]

        return (
          <VStack key={module.id} w="full" gap={4}>
            {/* Section Header for first node or new sections */}
            {index === 0 && (
              <SectionHeader
                title={`МОДУЛЬ ${index + 1}`}
                description={module.description}
                moduleId={module.id}
                isUnlocked={status !== 'locked'}
              />
            )}

            {/* Path Node */}
            <PathNode
              title={module.title}
              icon={getIconEmoji(module.icon)}
              status={status}
              progress={progress}
              xp={module.xpReward}
              onClick={() => {
                if (status !== 'locked') {
                  navigate(`${URLs.baseUrl}/modules/${module.id}`)
                }
              }}
              position={position}
              showConnector={index > 0}
              isLast={index === modules.length - 1}
            />

            {/* Section divider after every 3 modules */}
            {(index + 1) % 3 === 0 && index < modules.length - 1 && (
              <Box
                w="full"
                h="2px"
                bg="border.default"
                my={4}
                opacity={0.5}
              />
            )}
          </VStack>
        )
      })}

      {/* End chest/reward */}
      <VStack gap={3} pt={4}>
        <Flex
          w="70px"
          h="70px"
          borderRadius="duo.lg"
          bg="linear-gradient(180deg, #FFC800 0%, #FF9600 100%)"
          border="4px solid #FFC800"
          boxShadow="0 6px 0 #CC7700"
          align="center"
          justify="center"
        >
          <Text fontSize="3xl">🎁</Text>
        </Flex>
        <Text fontSize="sm" fontWeight="700" color="fg.muted">
          Завершите курс!
        </Text>
      </VStack>
    </VStack>
  )
}
