/**
 * Scrolls to the specified element with smooth behavior
 * @param {string} selector - The element selector (e.g., '#about')
 * @param {number} offset - Offset from the top (useful for fixed headers)
 */
export const scrollToElement = (selector, offset = 80) => {
  const element = document.querySelector(selector);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Format date to a readable string
 * @param {Date|string} date - Date object or date string
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Truncate text to a specific length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, length = 150) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Check if an element is in viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Offset to consider element visible before it enters viewport
 * @returns {boolean} True if element is in viewport
 */
export const isInViewport = (element, offset = 0) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight + offset) &&
    rect.bottom >= -offset
  );
};