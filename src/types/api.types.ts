// Module types
export interface Module {
  id: string
  title: string
  description: string
  icon: string
  order: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number
  tools: string[]
  prerequisites: string[]
  xpReward: number
  isCompleted?: boolean
  progress?: number
  isLocked?: boolean
  lessonsCount?: number
}

// Lesson types
export interface LessonContent {
  type: 'markdown' | 'interactive' | 'code-tutorial'
  sections: ContentSection[]
}

export interface ContentSection {
  heading: string
  body: string
  codeExamples?: CodeExample[]
  callouts?: Callout[]
}

export interface CodeExample {
  language: 'javascript' | 'typescript' | 'python' | 'json' | 'bash' | 'text'
  code: string
  description: string
  filename?: string
}

export interface Callout {
  type: 'tip' | 'warning' | 'note' | 'best-practice'
  content: string
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  order: number
  estimatedMinutes: number
  xpReward: number
  content: LessonContent
  exercises: string[]
  isCompleted?: boolean
  isLocked?: boolean
}

// Exercise types
export type ExerciseType =
  | 'multiple-choice'
  | 'prompt-rating'
  | 'prompt-fix'
  | 'matching'
  | 'text-input'
  | 'code-exercise'

export interface BaseExercise {
  id: string
  lessonId: string
  type: ExerciseType
  question: string
  instructions?: string
  hints: string[]
  xpReward: number
  explanation: string
}

export interface MultipleChoiceOption {
  id: string
  text: string
  isCorrect: boolean
  explanation?: string
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice'
  options: MultipleChoiceOption[]
  context?: string
}

export interface PromptRatingExercise extends BaseExercise {
  type: 'prompt-rating'
  prompts: Array<{
    id: string
    text: string
    model: 'gigachat' | 'deepseek' | 'perplexity' | 'generic'
    expectedRating: 1 | 2 | 3 | 4 | 5
    issues: string[]
    improvements: string[]
  }>
  criteria: string[]
}

export interface PromptFixExercise extends BaseExercise {
  type: 'prompt-fix'
  originalPrompt: string
  targetModel: 'gigachat' | 'deepseek' | 'perplexity' | 'generic'
  issues: string[]
  keywords: string[]
  minimumLength: number
  bestPractices: string[]
}

export interface MatchingExercise extends BaseExercise {
  type: 'matching'
  leftColumn: Array<{ id: string; text: string; icon?: string }>
  rightColumn: Array<{ id: string; text: string }>
  correctPairs: Array<{ leftId: string; rightId: string }>
  category: 'tools' | 'concepts' | 'use-cases'
}

export interface TextInputExercise extends BaseExercise {
  type: 'text-input'
  expectedKeywords: string[]
  minimumKeywords: number
  caseSensitive: boolean
  placeholder?: string
}

export interface CodeExercise extends BaseExercise {
  type: 'code-exercise'
  language: 'javascript' | 'typescript' | 'python' | 'json'
  starterCode?: string
  expectedPatterns: string[]
  syntaxCheck: boolean
}

export type Exercise =
  | MultipleChoiceExercise
  | PromptRatingExercise
  | PromptFixExercise
  | MatchingExercise
  | TextInputExercise
  | CodeExercise

// Progress types
export interface CompletedLesson {
  lessonId: string
  completedAt: string
  score: number
  attempts: number
}

export interface CompletedExercise {
  exerciseId: string
  completedAt: string
  isCorrect: boolean
  attempts: number
}

export interface Achievement {
  id: string
  title?: string
  unlockedAt?: string
  xpBonus?: number
}

export interface UserProgress {
  userId: string
  totalXP: number
  currentStreak: number
  longestStreak: number
  lastActivityDate: string
  completedLessons: CompletedLesson[]
  completedExercises: CompletedExercise[]
  achievements: Achievement[]
}

// API Response types
export interface ModulesResponse {
  modules: Module[]
}

export interface ModuleDetailResponse {
  module: Module & {
    lessons: Lesson[]
  }
}

export interface LessonResponse {
  lesson: Lesson
}

export interface ExerciseResponse {
  exercise: Exercise
}

export interface ProgressResponse {
  progress: UserProgress
}

export interface ExerciseSubmitRequest {
  type: ExerciseType
  selectedOptions?: string[]
  code?: string
  improvedPrompt?: string
  answer?: string | number
}

export interface ExerciseSubmitResponse {
  isCorrect: boolean
  xpEarned: number
  explanation: string
  feedback: {
    correctParts?: string[]
    improvements?: string[]
    syntaxErrors?: Array<{
      line: number
      message: string
      hint: string
    }>
  }
  nextExercise?: string | null
  allowRetry?: boolean
  attemptsLeft?: number
}

export interface LessonCompleteRequest {
  score?: number
  attempts?: number
  timeSpent?: number
}

export interface LessonCompleteResponse {
  success: boolean
  xpEarned: number
  totalXP: number
  newAchievements: Achievement[]
  streakUpdated: {
    currentStreak: number
    isNewRecord: boolean
  }
}

export interface ApiError {
  error: string
  message?: string
}
