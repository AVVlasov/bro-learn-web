/**
 * Async handler wrapper для автоматической обработки ошибок
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Sanitize input - удаляет потенциально опасные символы
 */
const sanitizeInput = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      // Удаляем потенциально опасные символы
      sanitized[key] = value.trim().replace(/[<>]/g, '');
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => sanitizeInput(item));
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

/**
 * Валидация ID
 */
const validateId = (id, fieldName = 'id') => {
  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    throw new Error(`Invalid ${fieldName}: must be a non-empty string`);
  }
  return id.trim();
};

/**
 * Валидация числа
 */
const validateNumber = (value, fieldName, min = 0, max = Infinity) => {
  const num = Number(value);
  if (isNaN(num) || num < min || num > max) {
    throw new Error(`Invalid ${fieldName}: must be a number between ${min} and ${max}`);
  }
  return num;
};

/**
 * Создание ошибки с кодом статуса
 */
class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode;
  }
}

/**
 * Проверка существования документа
 */
const ensureExists = (doc, entityName, id) => {
  if (!doc) {
    throw new ApiError(`${entityName} with id '${id}' not found`, 404);
  }
  return doc;
};

module.exports = {
  asyncHandler,
  sanitizeInput,
  validateId,
  validateNumber,
  ApiError,
  ensureExists
};
