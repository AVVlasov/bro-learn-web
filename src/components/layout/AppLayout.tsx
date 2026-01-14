import React, { useState } from 'react'
import { Box, Flex, Drawer, Text, VStack } from '@chakra-ui/react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

interface AppLayoutProps {
  children: React.ReactNode
}

// Right Sidebar with Quests and Stats
const RightSidebar: React.FC = () => {
  return (
    <Box
      as="aside"
      w="280px"
      h="calc(100vh - 70px)"
      position="sticky"
      top="70px"
      display={{ base: 'none', xl: 'block' }}
      p={4}
      overflowY="auto"
    >
      {/* Quests Widget */}
      <Box
        bg="bg.surface"
        borderRadius="duo.lg"
        border="2px solid"
        borderColor="border.default"
        p={4}
        mb={4}
      >
        <Text fontSize="md" fontWeight="800" color="fg.default" mb={3}>
          📋 Задания дня
        </Text>
        <VStack gap={3} align="stretch">
          <QuestItem
            title="Получите 10 XP"
            progress={0}
            goal={10}
            reward={5}
          />
          <QuestItem
            title="Завершите 1 урок"
            progress={0}
            goal={1}
            reward={10}
          />
          <QuestItem
            title="Пройдите без ошибок"
            progress={0}
            goal={1}
            reward={15}
          />
        </VStack>
      </Box>

      {/* Leaderboard Teaser */}
      <Box
        bg="bg.surface"
        borderRadius="duo.lg"
        border="2px solid"
        borderColor="border.default"
        p={4}
      >
        <Flex align="center" gap={2} mb={3}>
          <Text fontSize="xl">🏆</Text>
          <Text fontSize="md" fontWeight="800" color="fg.default">
            Рейтинг
          </Text>
        </Flex>
        <Box
          p={3}
          bg="bg.muted"
          borderRadius="duo.md"
          textAlign="center"
        >
          <Text fontSize="sm" color="fg.muted">
            Пройдите 10 уроков, чтобы<br />вступить в состязание
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

// Quest Item Component
const QuestItem: React.FC<{
  title: string
  progress: number
  goal: number
  reward: number
}> = ({ title, progress, goal, reward }) => {
  const progressPercent = (progress / goal) * 100

  return (
    <Box>
      <Flex justify="space-between" mb={1.5}>
        <Text fontSize="sm" fontWeight="600" color="fg.default">
          {title}
        </Text>
        <Flex align="center" gap={1}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L3 6L8 14L13 6L8 1Z" fill="#1CB0F6" />
            <path d="M8 1L3 6H13L8 1Z" fill="#49C0F8" />
          </svg>
          <Text fontSize="xs" fontWeight="700" color="duo.secondary">
            {reward}
          </Text>
        </Flex>
      </Flex>
      <Box
        h="10px"
        bg="bg.muted"
        borderRadius="duo.full"
        overflow="hidden"
      >
        <Box
          h="100%"
          w={`${progressPercent}%`}
          bg="duo.secondary"
          borderRadius="duo.full"
          transition="width 0.3s"
        />
      </Box>
      <Text fontSize="xs" color="fg.subtle" mt={1}>
        {progress}/{goal}
      </Text>
    </Box>
  )
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Flex direction="column" minH="100vh" bg="bg.canvas">
      <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

      <Flex flex={1}>
        <Sidebar />

        <Box
          as="main"
          flex={1}
          p={{ base: 4, md: 6 }}
          pb={{ base: '100px', lg: 6 }}
          maxW="800px"
          mx="auto"
          w="full"
        >
          {children}
        </Box>

        <RightSidebar />
      </Flex>

      <MobileNav />

      {/* Mobile drawer */}
      <Drawer.Root
        open={isMobileMenuOpen}
        onOpenChange={(e) => setIsMobileMenuOpen(e.open)}
        placement="start"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="bg.surface">
            <Drawer.Header borderBottomWidth="2px" borderColor="border.default">
              <Drawer.Title color="fg.default" fontWeight="800">
                Меню
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body p={0}>
              <Sidebar />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Flex>
  )
}
