import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

interface XPBadgeProps {
  xp: number
  size?: 'sm' | 'md' | 'lg'
}

// Star Icon
const StarIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path
      d="M10 1L12.5 7H19L14 11L16 18L10 14L4 18L6 11L1 7H7.5L10 1Z"
      fill="#FFC800"
    />
  </svg>
)

export const XPBadge: React.FC<XPBadgeProps> = ({ xp, size = 'md' }) => {
  const sizeStyles = {
    sm: {
      px: 2,
      py: 0.5,
      fontSize: 'xs' as const,
      iconSize: 14,
      gap: 1,
    },
    md: {
      px: 3,
      py: 1,
      fontSize: 'sm' as const,
      iconSize: 16,
      gap: 1.5,
    },
    lg: {
      px: 4,
      py: 1.5,
      fontSize: 'md' as const,
      iconSize: 20,
      gap: 2,
    },
  }

  const styles = sizeStyles[size]

  return (
    <Flex
      align="center"
      gap={styles.gap}
      px={styles.px}
      py={styles.py}
      bg="rgba(255, 200, 0, 0.15)"
      borderRadius="duo.full"
      border="2px solid"
      borderColor="duo.accent"
      display="inline-flex"
    >
      <StarIcon size={styles.iconSize} />
      <Text
        fontSize={styles.fontSize}
        fontWeight="800"
        color="duo.accent"
        letterSpacing="-0.5px"
      >
        {xp} XP
      </Text>
    </Flex>
  )
}
