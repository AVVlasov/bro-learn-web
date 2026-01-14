import React, { useState } from 'react'
import { Box, VStack, Text, Flex, Collapsible } from '@chakra-ui/react'

interface HintButtonProps {
  hints: string[]
}

// Lightbulb Icon
const LightbulbIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 2C6.69 2 4 4.69 4 8C4 10.22 5.21 12.16 7 13.19V15C7 15.55 7.45 16 8 16H12C12.55 16 13 15.55 13 15V13.19C14.79 12.16 16 10.22 16 8C16 4.69 13.31 2 10 2Z"
      fill="#FFC800"
    />
    <rect x="8" y="17" width="4" height="1" rx="0.5" fill="#FFC800" />
    <rect x="8.5" y="19" width="3" height="1" rx="0.5" fill="#FFC800" />
  </svg>
)

export const HintButton: React.FC<HintButtonProps> = ({ hints }) => {
  const [currentHintIndex, setCurrentHintIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)

  const showNextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex((prev) => prev + 1)
      setIsOpen(true)
    }
  }

  const hasMoreHints = currentHintIndex < hints.length - 1

  return (
    <VStack align="stretch" gap={3}>
      {/* Show hints */}
      {currentHintIndex >= 0 && (
        <Collapsible.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
          <Collapsible.Content>
            <Box
              p={4}
              bg="rgba(255, 200, 0, 0.1)"
              borderRadius="duo.md"
              border="2px solid"
              borderColor="duo.accent"
            >
              <Flex align="center" gap={2} mb={2}>
                <LightbulbIcon />
                <Text fontSize="sm" fontWeight="800" color="duo.accent">
                  Подсказка {currentHintIndex + 1}
                </Text>
              </Flex>
              <Text fontSize="md" color="fg.default" lineHeight="1.6">
                {hints[currentHintIndex]}
              </Text>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      )}

      {/* Show hint button */}
      {hasMoreHints && (
        <Flex
          as="button"
          align="center"
          justify="center"
          gap={2}
          py={2}
          px={4}
          borderRadius="duo.md"
          bg="transparent"
          border="2px solid"
          borderColor="duo.accent"
          cursor="pointer"
          transition="all 0.2s"
          alignSelf="flex-start"
          _hover={{
            bg: 'rgba(255, 200, 0, 0.1)',
          }}
          onClick={showNextHint}
        >
          <LightbulbIcon />
          <Text fontSize="sm" fontWeight="700" color="duo.accent">
            {currentHintIndex >= 0
              ? `Ещё подсказка (${currentHintIndex + 1}/${hints.length})`
              : 'Показать подсказку'}
          </Text>
        </Flex>
      )}
    </VStack>
  )
}
