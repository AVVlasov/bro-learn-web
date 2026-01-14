import React from 'react'
import { Flex, Text, VStack, Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// Animated Mascot Loader
const AnimatedMascot: React.FC<{ size: number }> = ({ size }) => (
  <Box animation={`${bounce} 1s ease-in-out infinite`}>
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Robot Head */}
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
      
      {/* Body */}
      <rect x="25" y="62" width="30" height="15" rx="5" fill="#58CC02" />
    </svg>
  </Box>
)

// Loading Dots
const LoadingDots: React.FC = () => (
  <Flex gap={1} align="center">
    {[0, 1, 2].map((i) => (
      <Box
        key={i}
        w="8px"
        h="8px"
        borderRadius="full"
        bg="duo.primary"
        animation={`${pulse} 1s ease-in-out infinite`}
        style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}
  </Flex>
)

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Загрузка...',
  size = 'lg',
}) => {
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
    xl: 100,
  }

  return (
    <Flex
      w="full"
      minH="400px"
      align="center"
      justify="center"
      py={10}
    >
      <VStack gap={6}>
        <AnimatedMascot size={sizeMap[size]} />
        <LoadingDots />
        {message && (
          <Text
            color="fg.muted"
            fontSize="md"
            fontWeight="600"
            animation={`${pulse} 2s ease-in-out infinite`}
          >
            {message}
          </Text>
        )}
      </VStack>
    </Flex>
  )
}
