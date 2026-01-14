import React from 'react'
import { VStack, Text, Flex, Box } from '@chakra-ui/react'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

// Sad Robot Mascot
const SadMascot: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {/* Robot Head */}
    <rect x="15" y="15" width="50" height="45" rx="10" fill="#4B4B4B" />
    <rect x="18" y="18" width="44" height="39" rx="8" fill="#5C5C5C" />
    
    {/* Eyes (sad) */}
    <ellipse cx="30" cy="35" rx="8" ry="8" fill="white" />
    <ellipse cx="50" cy="35" rx="8" ry="8" fill="white" />
    <circle cx="30" cy="38" r="4" fill="#1A1A1A" />
    <circle cx="50" cy="38" r="4" fill="#1A1A1A" />
    
    {/* Sad eyebrows */}
    <path d="M22 28L38 32" stroke="#3C3C3C" strokeWidth="3" strokeLinecap="round" />
    <path d="M58 28L42 32" stroke="#3C3C3C" strokeWidth="3" strokeLinecap="round" />
    
    {/* Antenna */}
    <rect x="37" y="5" width="6" height="12" rx="3" fill="#4B4B4B" />
    <circle cx="40" cy="5" r="5" fill="#777777" />
    
    {/* Sad mouth */}
    <path d="M30 52 Q40 46 50 52" stroke="#FF4B4B" strokeWidth="4" strokeLinecap="round" fill="none" />
    
    {/* Body */}
    <rect x="25" y="62" width="30" height="15" rx="5" fill="#4B4B4B" />
  </svg>
)

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = 'Что-то пошло не так',
  onRetry,
}) => {
  return (
    <Flex
      w="full"
      minH="400px"
      align="center"
      justify="center"
      py={10}
    >
      <VStack gap={6}>
        <SadMascot />
        
        <VStack gap={2}>
          <Text
            fontSize="xl"
            fontWeight="800"
            color="fg.default"
            textAlign="center"
          >
            Упс!
          </Text>
          <Text
            color="fg.muted"
            fontSize="md"
            textAlign="center"
            maxW="300px"
          >
            {message}
          </Text>
        </VStack>

        {onRetry && (
          <Flex
            as="button"
            px={6}
            py={3}
            borderRadius="duo.md"
            bg="duo.secondary"
            boxShadow="0 4px 0 #1899D6"
            cursor="pointer"
            transition="all 0.1s"
            _hover={{
              filter: 'brightness(1.1)',
            }}
            _active={{
              transform: 'translateY(4px)',
              boxShadow: 'none',
            }}
            onClick={onRetry}
          >
            <Text
              fontSize="md"
              fontWeight="800"
              color="white"
              textTransform="uppercase"
              letterSpacing="1px"
            >
              Попробовать снова
            </Text>
          </Flex>
        )}
      </VStack>
    </Flex>
  )
}
