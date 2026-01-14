/**
 * Maps icon names to emojis
 */

const iconToEmoji: Record<string, string> = {
  'message-square': '💬',
  'globe': '🌐',
  'code': '💻',
  'bot': '🤖',
  'server': '🖥️',
  'brain': '🧠',
  'book': '📚',
  'lightbulb': '💡',
  'star': '⭐',
  'rocket': '🚀',
  'target': '🎯',
  'puzzle': '🧩',
  'chart': '📊',
  'search': '🔍',
  'settings': '⚙️',
  'user': '👤',
  'users': '👥',
  'file': '📄',
  'folder': '📁',
  'link': '🔗',
  'lock': '🔒',
  'unlock': '🔓',
  'check': '✅',
  'x': '❌',
  'alert': '⚠️',
  'info': 'ℹ️',
  'help': '❓',
  'plus': '➕',
  'minus': '➖',
  'edit': '✏️',
  'trash': '🗑️',
  'download': '⬇️',
  'upload': '⬆️',
  'share': '↗️',
  'copy': '📋',
  'paste': '📌',
  'cut': '✂️',
  'undo': '↩️',
  'redo': '↪️',
  'refresh': '🔄',
  'home': '🏠',
  'mail': '📧',
  'phone': '📞',
  'camera': '📷',
  'video': '🎬',
  'music': '🎵',
  'image': '🖼️',
  'calendar': '📅',
  'clock': '⏰',
  'map': '🗺️',
  'location': '📍',
  'heart': '❤️',
  'thumbs-up': '👍',
  'thumbs-down': '👎',
  'fire': '🔥',
  'lightning': '⚡',
  'cloud': '☁️',
  'sun': '☀️',
  'moon': '🌙',
  'zap': '⚡',
}

/**
 * Get emoji for icon name, or return the original string if it's already an emoji
 */
export const getIconEmoji = (icon: string): string => {
  // If icon is already an emoji (starts with non-ASCII character), return as is
  if (icon && /[\u{1F300}-\u{1F9FF}]/u.test(icon)) {
    return icon
  }
  
  // Return mapped emoji or default
  return iconToEmoji[icon] || '📌'
}
