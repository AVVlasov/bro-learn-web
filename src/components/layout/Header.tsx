import React from 'react'
import { Box, Flex, Text, HStack, IconButton } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useGetProgressQuery } from '../../api/progressApi'

interface HeaderProps {
  onMenuClick?: () => void
}

// Duolingo-style Owl Logo SVG
const DuoLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="#58CC02" />
    <ellipse cx="11" cy="14" rx="4" ry="5" fill="white" />
    <ellipse cx="21" cy="14" rx="4" ry="5" fill="white" />
    <circle cx="11" cy="15" r="2" fill="#1A1A1A" />
    <circle cx="21" cy="15" r="2" fill="#1A1A1A" />
    <ellipse cx="16" cy="22" rx="5" ry="3" fill="#FF9600" />
    <path d="M16 21 L15 23 L16 22 L17 23 Z" fill="#FFC800" />
  </svg>
)

// Streak Fire Icon
const StreakIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C12 2 7 8 7 13C7 17 9.5 20 12 20C14.5 20 17 17 17 13C17 8 12 2 12 2Z"
      fill="#FF9600"
    />
    <path
      d="M12 8C12 8 10 11 10 14C10 16 11 18 12 18C13 18 14 16 14 14C14 11 12 8 12 8Z"
      fill="#FFC800"
    />
  </svg>
)

// Gem Icon
const GemIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L3 8L10 18L17 8L10 2Z" fill="#1CB0F6" />
    <path d="M10 2L3 8H17L10 2Z" fill="#49C0F8" />
    <path d="M10 7L5 8L10 18L15 8L10 7Z" fill="#1899D6" />
  </svg>
)

// XP Star Icon
const XPIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 1L12.5 7H19L14 11L16 18L10 14L4 18L6 11L1 7H7.5L10 1Z"
      fill="#FFC800"
    />
  </svg>
)

// Counter Badge Component
const CounterBadge: React.FC<{
  icon: React.ReactNode
  value: number | string
  label?: string
  color?: string
  onClick?: () => void
}> = ({ icon, value, label, color = 'fg.default', onClick }) => (
  <Flex
    align="center"
    gap={1}
    px={3}
    py={1.5}
    borderRadius="duo.full"
    bg="bg.muted"
    cursor={onClick ? 'pointer' : 'default'}
    transition="all 0.2s"
    _hover={onClick ? { bg: 'border.default' } : undefined}
    onClick={onClick}
  >
    <Box flexShrink={0}>{icon}</Box>
    <Text
      fontSize="md"
      fontWeight="bold"
      color={color}
      letterSpacing="-0.5px"
    >
      {value}
    </Text>
  </Flex>
)

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { data: progressData } = useGetProgressQuery()
  const navigate = useNavigate()

  const streak = progressData?.progress?.currentStreak || 0
  const xp = progressData?.progress?.totalXP || 0
  const gems = 500 // Default gems

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="bg.surface"
      borderBottomWidth="2px"
      borderColor="border.default"
      px={{ base: 3, md: 6 }}
      h={{ base: '60px', md: '70px' }}
    >
      <Flex h="full" align="center" justify="space-between" maxW="1400px" mx="auto">
        {/* Left: Logo & Navigation */}
        <Flex align="center" gap={4}>
          {/* Mobile Menu Button */}
          {onMenuClick && (
            <IconButton
              aria-label="Open menu"
              variant="ghost"
              size="sm"
              display={{ base: 'flex', lg: 'none' }}
              onClick={onMenuClick}
              borderRadius="duo.md"
              _hover={{ bg: 'bg.muted' }}
            >
              <Text fontSize="xl">☰</Text>
            </IconButton>
          )}

          {/* Logo */}
          <Flex
            align="center"
            gap={2}
            cursor="pointer"
            onClick={() => navigate('/')}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
            _active={{ transform: 'scale(0.95)' }}
          >
            <DuoLogo />
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight="800"
              color="duo.primary"
              letterSpacing="-1px"
              display={{ base: 'none', sm: 'block' }}
            >
              brolearn
            </Text>
          </Flex>
        </Flex>

        {/* Right: Stats Counters */}
        <HStack gap={{ base: 2, md: 3 }}>
          {/* Streak Counter */}
          <CounterBadge
            icon={<StreakIcon />}
            value={streak}
            color={streak > 0 ? 'duo.streak' : 'fg.muted'}
          />

          {/* Gems Counter - Hidden on mobile */}
          <Box display={{ base: 'none', md: 'block' }}>
            <CounterBadge
              icon={<GemIcon />}
              value={gems}
              color="duo.secondary"
            />
          </Box>

          {/* XP Counter */}
          <CounterBadge
            icon={<XPIcon />}
            value={xp}
            color="duo.accent"
          />
        </HStack>
      </Flex>
    </Box>
  )
}
