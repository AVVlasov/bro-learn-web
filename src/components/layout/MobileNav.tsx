import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { URLs } from '../../__data__/urls'

interface NavItem {
  label: string
  path: string
  activeColor: string
}

// Navigation Icons
const LearnIcon = ({ active }: { active: boolean }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle
      cx="14"
      cy="14"
      r="10"
      fill={active ? '#58CC02' : 'none'}
      stroke={active ? '#58CC02' : 'currentColor'}
      strokeWidth="2"
    />
    <path
      d="M11 10V18L18 14L11 10Z"
      fill={active ? 'white' : 'currentColor'}
    />
  </svg>
)

const LeaderboardIcon = ({ active }: { active: boolean }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect
      x="10"
      y="6"
      width="8"
      height="18"
      rx="2"
      fill={active ? '#FFC800' : 'none'}
      stroke={active ? '#FFC800' : 'currentColor'}
      strokeWidth="2"
    />
    <rect
      x="2"
      y="12"
      width="8"
      height="12"
      rx="2"
      fill={active ? '#CE82FF' : 'none'}
      stroke={active ? '#CE82FF' : 'currentColor'}
      strokeWidth="2"
    />
    <rect
      x="18"
      y="14"
      width="8"
      height="10"
      rx="2"
      fill={active ? '#FF9600' : 'none'}
      stroke={active ? '#FF9600' : 'currentColor'}
      strokeWidth="2"
    />
  </svg>
)

const QuestsIcon = ({ active }: { active: boolean }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect
      x="4"
      y="4"
      width="20"
      height="20"
      rx="3"
      fill={active ? '#FF9600' : 'none'}
      stroke={active ? '#FF9600' : 'currentColor'}
      strokeWidth="2"
    />
    <path
      d="M8 12L12 16L20 8"
      stroke={active ? 'white' : 'currentColor'}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle
      cx="14"
      cy="10"
      r="5"
      fill={active ? '#1CB0F6' : 'none'}
      stroke={active ? '#1CB0F6' : 'currentColor'}
      strokeWidth="2"
    />
    <path
      d="M5 24C5 20 9 17 14 17C19 17 23 20 23 24"
      stroke={active ? '#1CB0F6' : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      fill={active ? '#1CB0F6' : 'none'}
    />
  </svg>
)

const getNavItems = (): NavItem[] => [
  { label: 'Обучение', path: URLs.baseUrl, activeColor: '#58CC02' },
  { label: 'Рейтинг', path: `${URLs.baseUrl}/leaderboard`, activeColor: '#FFC800' },
  { label: 'Задания', path: `${URLs.baseUrl}/quests`, activeColor: '#FF9600' },
  { label: 'Профиль', path: `${URLs.baseUrl}/profile`, activeColor: '#1CB0F6' },
]

const getIcon = (path: string, active: boolean, baseUrl: string) => {
  if (path === baseUrl) {
    return <LearnIcon active={active} />
  } else if (path.includes('/leaderboard')) {
    return <LeaderboardIcon active={active} />
  } else if (path.includes('/quests')) {
    return <QuestsIcon active={active} />
  } else if (path.includes('/profile')) {
    return <ProfileIcon active={active} />
  }
  return <LearnIcon active={active} />
}

export const MobileNav: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const navItems = getNavItems()

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="bg.surface"
      borderTopWidth="2px"
      borderColor="border.default"
      display={{ base: 'block', lg: 'none' }}
      zIndex="1000"
      h="70px"
      pb="env(safe-area-inset-bottom)"
    >
      <Flex h="full" justify="space-around" align="center" px={2}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Flex
              key={item.path}
              direction="column"
              align="center"
              justify="center"
              gap={0.5}
              flex={1}
              h="full"
              cursor="pointer"
              color={isActive ? item.activeColor : 'fg.muted'}
              borderRadius="duo.md"
              transition="all 0.2s"
              _active={{
                bg: 'bg.muted',
                transform: 'scale(0.95)',
              }}
              onClick={() => navigate(item.path)}
            >
              <Box>{getIcon(item.path, isActive, URLs.baseUrl)}</Box>
              <Text
                fontSize="xs"
                fontWeight={isActive ? '800' : '600'}
                letterSpacing="-0.3px"
              >
                {item.label}
              </Text>
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
}
