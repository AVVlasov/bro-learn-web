import React from 'react'
import { Box, VStack, Text, Flex } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import type { ExerciseSubmitResponse } from '../../types/api.types'

// Animations
const scaleIn = keyframes`
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

interface ExerciseFeedbackProps {
  result: ExerciseSubmitResponse
  onContinue: () => void
  onRetry?: () => void
}

// Checkmark Icon (animated)
const CheckmarkIcon: React.FC = () => (
  <Box animation={`${scaleIn} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#58CC02" />
      <path
        d="M14 24L22 32L34 18"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
)

// X Icon (animated)
const XIcon: React.FC = () => (
  <Box animation={`${scaleIn} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#FF4B4B" />
      <path
        d="M16 16L32 32M32 16L16 32"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  </Box>
)

// Star Icon
const StarIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path
      d="M10 1L12.5 7H19L14 11L16 18L10 14L4 18L6 11L1 7H7.5L10 1Z"
      fill="#FFC800"
    />
  </svg>
)

export const ExerciseFeedback: React.FC<ExerciseFeedbackProps> = ({
  result,
  onContinue,
  onRetry,
}) => {
  const isCorrect = result.isCorrect

  return (
    <VStack align="stretch" gap={4} animation={`${slideUp} 0.3s ease-out`}>
      <Box
        p={5}
        borderRadius="duo.lg"
        bg={isCorrect ? 'bg.success' : 'bg.error'}
        border="2px solid"
        borderColor={isCorrect ? 'duo.success' : 'duo.error'}
      >
        <VStack align="stretch" gap={4}>
          {/* Header */}
          <Flex align="center" gap={4}>
            {isCorrect ? <CheckmarkIcon /> : <XIcon />}
            <VStack align="start" gap={1}>
              <Text
                fontSize="xl"
                fontWeight="800"
                color={isCorrect ? 'duo.success' : 'duo.error'}
              >
                {isCorrect ? 'Отлично!' : 'Не совсем...'}
              </Text>
              {result.xpEarned > 0 && (
                <Flex align="center" gap={1}>
                  <StarIcon size={18} />
                  <Text fontSize="md" fontWeight="700" color="duo.accent">
                    +{result.xpEarned} XP
                  </Text>
                </Flex>
              )}
            </VStack>
          </Flex>

          {/* Explanation */}
          <Text fontSize="md" color="fg.default" lineHeight="1.6">
            {result.explanation}
          </Text>

          {/* Correct parts */}
          {result.feedback?.correctParts && result.feedback.correctParts.length > 0 && (
            <Box
              p={3}
              bg="rgba(88, 204, 2, 0.1)"
              borderRadius="duo.md"
              borderLeft="4px solid"
              borderLeftColor="duo.success"
            >
              <Text fontSize="sm" fontWeight="700" color="duo.success" mb={2}>
                ✓ Правильно:
              </Text>
              <VStack align="stretch" gap={1}>
                {result.feedback.correctParts.map((part, idx) => (
                  <Text key={idx} fontSize="sm" color="fg.default">
                    • {part}
                  </Text>
                ))}
              </VStack>
            </Box>
          )}

          {/* Improvements */}
          {result.feedback?.improvements && result.feedback.improvements.length > 0 && (
            <Box
              p={3}
              bg="rgba(255, 150, 0, 0.1)"
              borderRadius="duo.md"
              borderLeft="4px solid"
              borderLeftColor="duo.streak"
            >
              <Text fontSize="sm" fontWeight="700" color="duo.streak" mb={2}>
                💡 Что можно улучшить:
              </Text>
              <VStack align="stretch" gap={1}>
                {result.feedback.improvements.map((improvement, idx) => (
                  <Text key={idx} fontSize="sm" color="fg.default">
                    • {improvement}
                  </Text>
                ))}
              </VStack>
            </Box>
          )}
        </VStack>
      </Box>

      {/* Retry Button (if available) */}
      {result.allowRetry && onRetry && (
        <Flex
          as="button"
          w="full"
          py={3}
          px={6}
          borderRadius="duo.md"
          bg="transparent"
          border="2px solid"
          borderColor="duo.secondary"
          align="center"
          justify="center"
          cursor="pointer"
          transition="all 0.2s"
          _hover={{
            bg: 'rgba(28, 176, 246, 0.1)',
          }}
          onClick={onRetry}
        >
          <Text
            fontSize="md"
            fontWeight="700"
            color="duo.secondary"
            textTransform="uppercase"
            letterSpacing="1px"
          >
            Попробовать снова
          </Text>
        </Flex>
      )}
    </VStack>
  )
}
