import React from 'react'
import { Box, VStack, Text, Flex } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGetProgressQuery } from '../../api/progressApi'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  activeColor: string
}

// Navigation Icons as SVG
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M4 12L14 4L24 12V22C24 23.1 23.1 24 22 24H6C4.9 24 4 23.1 4 22V12Z"
      fill={active ? '#1CB0F6' : 'currentColor'}
      stroke={active ? '#1CB0F6' : 'currentColor'}
      strokeWidth="2"
    />
    <path
      d="M10 24V16H18V24"
      stroke={active ? 'white' : 'currentColor'}
      strokeWidth="2"
      fill={active ? '#1899D6' : 'none'}
    />
  </svg>
)

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

const navItems: NavItem[] = [
  { label: 'Обучение', path: '/', icon: <LearnIcon active={false} />, activeColor: '#58CC02' },
  { label: 'Рейтинг', path: '/leaderboard', icon: <LeaderboardIcon active={false} />, activeColor: '#FFC800' },
  { label: 'Задания', path: '/quests', icon: <QuestsIcon active={false} />, activeColor: '#FF9600' },
  { label: 'Профиль', path: '/profile', icon: <ProfileIcon active={false} />, activeColor: '#1CB0F6' },
]

// Daily Goal Progress Widget
const DailyGoalWidget: React.FC<{ currentXP: number; goalXP: number }> = ({
  currentXP,
  goalXP,
}) => {
  const progress = Math.min((currentXP / goalXP) * 100, 100)

  return (
    <Box
      p={4}
      borderRadius="duo.lg"
      bg="bg.muted"
      border="2px solid"
      borderColor="border.default"
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontSize="sm" fontWeight="bold" color="fg.default">
          Дневная цель
        </Text>
        <Text fontSize="sm" fontWeight="bold" color="duo.accent">
          {currentXP}/{goalXP} XP
        </Text>
      </Flex>
      <Box
        h="12px"
        bg="bg.surface"
        borderRadius="duo.full"
        overflow="hidden"
        position="relative"
      >
        <Box
          h="100%"
          w={`${progress}%`}
          bgGradient="linear(to-r, #58CC02, #89E219)"
          borderRadius="duo.full"
          transition="width 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
          position="relative"
          _after={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            animation: 'shimmer 2s infinite',
          }}
        />
      </Box>
    </Box>
  )
}

export const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { data: progressData } = useGetProgressQuery()

  const todayXP = progressData?.progress?.totalXP || 0
  const dailyGoal = 20

  return (
    <Box
      as="aside"
      bg="bg.surface"
      borderRightWidth="2px"
      borderColor="border.default"
      w="260px"
      h="calc(100vh - 70px)"
      position="sticky"
      top="70px"
      display={{ base: 'none', lg: 'flex' }}
      flexDirection="column"
      overflowY="auto"
    >
      {/* Navigation Items */}
      <VStack align="stretch" gap={1} p={4} flex={1}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <Box
              key={item.path}
              px={4}
              py={3}
              borderRadius="duo.md"
              cursor="pointer"
              bg={isActive ? 'bg.muted' : 'transparent'}
              borderWidth="2px"
              borderColor={isActive ? item.activeColor : 'transparent'}
              transition="all 0.2s"
              _hover={{
                bg: 'bg.muted',
                borderColor: isActive ? item.activeColor : 'border.default',
                transform: 'translateX(4px)',
              }}
              _active={{
                transform: 'translateX(2px)',
              }}
              onClick={() => navigate(item.path)}
            >
              <Flex align="center" gap={3}>
                <Box
                  color={isActive ? item.activeColor : 'fg.muted'}
                  fontSize="xl"
                >
                  {isActive ? (
                    item.path === '/' ? <LearnIcon active={true} /> :
                    item.path === '/leaderboard' ? <LeaderboardIcon active={true} /> :
                    item.path === '/quests' ? <QuestsIcon active={true} /> :
                    <ProfileIcon active={true} />
                  ) : (
                    item.path === '/' ? <LearnIcon active={false} /> :
                    item.path === '/leaderboard' ? <LeaderboardIcon active={false} /> :
                    item.path === '/quests' ? <QuestsIcon active={false} /> :
                    <ProfileIcon active={false} />
                  )}
                </Box>
                <Text
                  fontSize="md"
                  fontWeight={isActive ? '800' : '600'}
                  color={isActive ? 'fg.default' : 'fg.muted'}
                  letterSpacing="-0.3px"
                >
                  {item.label}
                </Text>
              </Flex>
            </Box>
          )
        })}
      </VStack>

      {/* Daily Goal Widget */}
      <Box p={4}>
        <DailyGoalWidget currentXP={todayXP} goalXP={dailyGoal} />
      </Box>
    </Box>
  )
}
