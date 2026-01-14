import React from 'react'
import { Box, Circle, CircularProgress, VStack, Text } from '@chakra-ui/react'

interface ProgressRingProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  label?: string
  showPercentage?: boolean
}

const sizes = {
  sm: { boxSize: '80px', thickness: '6px', fontSize: 'xs' },
  md: { boxSize: '120px', thickness: '8px', fontSize: 'md' },
  lg: { boxSize: '160px', thickness: '10px', fontSize: 'lg' },
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 'md',
  label,
  showPercentage = true,
}) => {
  const { boxSize, thickness, fontSize } = sizes[size]

  return (
    <VStack gap={2}>
      <Box position="relative" boxSize={boxSize}>
        <CircularProgress.Root
          value={value}
          size={boxSize}
          thickness={thickness}
          colorPalette="blue"
        >
          <CircularProgress.Circle />
          <CircularProgress.Track />
          <CircularProgress.ValueText
            fontSize={fontSize}
            fontWeight="bold"
            color="fg.default"
          />
        </CircularProgress.Root>
      </Box>
      {label && (
        <Text
          fontSize="sm"
          color="fg.muted"
          fontWeight="medium"
          textAlign="center"
        >
          {label}
        </Text>
      )}
    </VStack>
  )
}
