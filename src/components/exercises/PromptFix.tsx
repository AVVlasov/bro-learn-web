import React, { useState } from 'react'
import { Box, VStack, Button, Textarea, Text } from '@chakra-ui/react'
import type { PromptFixExercise } from '../../types/api.types'

interface PromptFixProps {
  exercise: PromptFixExercise
  onSubmit: (improvedPrompt: string) => void
  isSubmitting: boolean
}

export const PromptFix: React.FC<PromptFixProps> = ({
  exercise,
  onSubmit,
  isSubmitting,
}) => {
  const [improvedPrompt, setImprovedPrompt] = useState(exercise.originalPrompt)

  const handleSubmit = () => {
    if (improvedPrompt.trim() && improvedPrompt !== exercise.originalPrompt) {
      onSubmit(improvedPrompt)
    }
  }

  return (
    <VStack align="stretch" gap={4}>
      <Box
        p={4}
        bg="bg.muted"
        borderRadius="l2"
        borderLeftWidth="4px"
        borderLeftColor="orange.400"
      >
        <Text fontSize="sm" fontWeight="semibold" color="orange.400" mb={2}>
          Оригинальный промпт:
        </Text>
        <Text fontSize="sm" color="fg.muted" fontStyle="italic">
          "{exercise.originalPrompt}"
        </Text>
      </Box>

      {exercise.issues.length > 0 && (
        <Box>
          <Text fontSize="sm" fontWeight="semibold" color="fg.default" mb={2}>
            Проблемы:
          </Text>
          <VStack align="stretch" gap={1}>
            {exercise.issues.map((issue, idx) => (
              <Text key={idx} fontSize="sm" color="fg.muted">
                • {issue}
              </Text>
            ))}
          </VStack>
        </Box>
      )}

      <Box>
        <Text fontSize="sm" fontWeight="semibold" color="fg.default" mb={2}>
          Ваш улучшенный промпт:
        </Text>
        <Textarea
          value={improvedPrompt}
          onChange={(e) => setImprovedPrompt(e.target.value)}
          placeholder="Напишите улучшенную версию промпта..."
          rows={6}
          size="lg"
          resize="vertical"
          bg="bg.surface"
          borderColor="border.default"
          _focus={{
            borderColor: 'blue.400',
            shadow: '0 0 0 1px var(--chakra-colors-blue-400)',
          }}
        />
      </Box>

      <Text fontSize="xs" color="fg.muted">
        {improvedPrompt.length} / {exercise.minimumLength}+ символов
      </Text>

      <Button
        colorPalette="blue"
        size="lg"
        w="full"
        onClick={handleSubmit}
        disabled={
          !improvedPrompt.trim() ||
          improvedPrompt === exercise.originalPrompt ||
          improvedPrompt.length < exercise.minimumLength ||
          isSubmitting
        }
        loading={isSubmitting}
      >
        Проверить улучшения
      </Button>
    </VStack>
  )
}
