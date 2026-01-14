import React, { useState } from 'react'
import { Box, VStack, Text, Flex } from '@chakra-ui/react'
import type { MultipleChoiceExercise } from '../../types/api.types'

interface MultipleChoiceProps {
  exercise: MultipleChoiceExercise
  onSubmit: (selectedOptions: string[]) => void
  isSubmitting: boolean
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  exercise,
  onSubmit,
  isSubmitting,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const allowMultiple = exercise.options.filter((o) => o.isCorrect).length > 1

  const handleToggle = (optionId: string) => {
    if (allowMultiple) {
      setSelectedOptions((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      )
    } else {
      setSelectedOptions([optionId])
    }
  }

  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      onSubmit(selectedOptions)
    }
  }

  return (
    <VStack align="stretch" gap={4}>
      {/* Context */}
      {exercise.context && (
        <Box
          p={4}
          bg="rgba(28, 176, 246, 0.1)"
          borderRadius="duo.md"
          borderLeft="4px solid"
          borderLeftColor="duo.secondary"
        >
          <Text fontSize="md" color="fg.default">
            {exercise.context}
          </Text>
        </Box>
      )}

      {/* Options */}
      <VStack align="stretch" gap={3}>
        {exercise.options.map((option, index) => {
          const isSelected = selectedOptions.includes(option.id)

          return (
            <Flex
              key={option.id}
              as="button"
              p={4}
              borderWidth="2px"
              borderColor={isSelected ? 'duo.secondary' : 'border.default'}
              borderRadius="duo.md"
              bg={isSelected ? 'rgba(28, 176, 246, 0.1)' : 'bg.muted'}
              boxShadow={isSelected ? '0 4px 0 #1899D6' : '0 4px 0 rgba(0,0,0,0.2)'}
              cursor="pointer"
              transition="all 0.15s"
              align="center"
              gap={3}
              _hover={{
                borderColor: 'duo.secondary',
                transform: 'translateY(-2px)',
              }}
              _active={{
                transform: 'translateY(2px)',
                boxShadow: 'none',
              }}
              onClick={() => handleToggle(option.id)}
            >
              {/* Selection indicator */}
              <Flex
                w="28px"
                h="28px"
                borderRadius={allowMultiple ? 'duo.sm' : 'full'}
                border="3px solid"
                borderColor={isSelected ? 'duo.secondary' : 'border.default'}
                bg={isSelected ? 'duo.secondary' : 'transparent'}
                align="center"
                justify="center"
                flexShrink={0}
                transition="all 0.15s"
              >
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7L6 10L11 4"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Flex>

              {/* Option number */}
              <Flex
                w="28px"
                h="28px"
                borderRadius="duo.sm"
                bg="bg.surface"
                border="2px solid"
                borderColor="border.default"
                align="center"
                justify="center"
                flexShrink={0}
              >
                <Text fontSize="sm" fontWeight="800" color="fg.muted">
                  {index + 1}
                </Text>
              </Flex>

              {/* Option text */}
              <Text
                fontSize="md"
                fontWeight="600"
                color="fg.default"
                textAlign="left"
                flex={1}
              >
                {option.text}
              </Text>
            </Flex>
          )
        })}
      </VStack>

      {/* Submit Button */}
      <Flex
        as="button"
        w="full"
        py={4}
        px={6}
        borderRadius="duo.md"
        bg={selectedOptions.length === 0 ? '#4B4B4B' : '#58CC02'}
        boxShadow={selectedOptions.length === 0 ? '0 4px 0 #2B2B2B' : '0 4px 0 #458600'}
        align="center"
        justify="center"
        cursor={selectedOptions.length === 0 ? 'not-allowed' : 'pointer'}
        opacity={selectedOptions.length === 0 ? 0.7 : 1}
        transition="all 0.1s"
        _hover={
          selectedOptions.length > 0
            ? {
                filter: 'brightness(1.1)',
              }
            : undefined
        }
        _active={
          selectedOptions.length > 0
            ? {
                transform: 'translateY(4px)',
                boxShadow: 'none',
              }
            : undefined
        }
        onClick={selectedOptions.length > 0 && !isSubmitting ? handleSubmit : undefined}
      >
        <Text
          fontSize="md"
          fontWeight="800"
          color="white"
          textTransform="uppercase"
          letterSpacing="1px"
        >
          {isSubmitting ? 'Проверяем...' : 'Проверить'}
        </Text>
      </Flex>
    </VStack>
  )
}
