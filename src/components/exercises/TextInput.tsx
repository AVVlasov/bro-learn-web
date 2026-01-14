import React, { useState } from 'react'
import { VStack, Button, Textarea, Text } from '@chakra-ui/react'
import type { TextInputExercise } from '../../types/api.types'

interface TextInputProps {
  exercise: TextInputExercise
  onSubmit: (answer: string) => void
  isSubmitting: boolean
}

export const TextInput: React.FC<TextInputProps> = ({
  exercise,
  onSubmit,
  isSubmitting,
}) => {
  const [answer, setAnswer] = useState('')

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer)
    }
  }

  return (
    <VStack align="stretch" gap={4}>
      <Textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={exercise.placeholder || 'Введите ваш ответ...'}
        rows={4}
        size="lg"
        resize="vertical"
        bg="bg.surface"
        borderColor="border.default"
        _focus={{
          borderColor: 'blue.400',
          shadow: '0 0 0 1px var(--chakra-colors-blue-400)',
        }}
      />

      <Text fontSize="xs" color="fg.muted">
        {answer.length} символов
      </Text>

      <Button
        colorPalette="blue"
        size="lg"
        w="full"
        onClick={handleSubmit}
        disabled={!answer.trim() || isSubmitting}
        loading={isSubmitting}
      >
        Отправить ответ
      </Button>
    </VStack>
  )
}
