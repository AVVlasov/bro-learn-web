import React from 'react'
import { Box } from '@chakra-ui/react'

interface CardProps {
  children: React.ReactNode
  onClick?: () => void
  isActive?: boolean
  isDisabled?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  onClick,
  isActive = false,
  isDisabled = false,
}) => {
  return (
    <Box
      bg="bg.surface"
      borderWidth="2px"
      borderColor={isActive ? 'duo.primary' : 'border.default'}
      borderRadius="duo.lg"
      p={{ base: 4, md: 5 }}
      cursor={onClick && !isDisabled ? 'pointer' : 'default'}
      opacity={isDisabled ? 0.6 : 1}
      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={
        onClick && !isDisabled
          ? {
              borderColor: 'duo.primary',
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 20px rgba(88, 204, 2, 0.2)',
            }
          : undefined
      }
      _active={
        onClick && !isDisabled
          ? {
              transform: 'translateY(-2px)',
            }
          : undefined
      }
      onClick={!isDisabled ? onClick : undefined}
    >
      {children}
    </Box>
  )
}
