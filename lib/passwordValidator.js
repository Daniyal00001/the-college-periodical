/**
 * Password validation utility function.
 * Enforces strong security requirements for user account creation.
 *
 * Rules:
 * 1. Minimum 8 characters
 * 2. At least one uppercase letter (A-Z)
 * 3. At least one lowercase letter (a-z)
 * 4. At least one number (0-9)
 * 5. At least one special character (!@#$%^&* etc.)
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return {
      isValid: false,
      errors: ['Password is required.']
    }
  }

  const checks = {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  }

  const errors = []
  if (!checks.minLength) errors.push('At least 8 characters long')
  if (!checks.hasUpper) errors.push('At least one uppercase letter (A-Z)')
  if (!checks.hasLower) errors.push('At least one lowercase letter (a-z)')
  if (!checks.hasNumber) errors.push('At least one number (0-9)')
  if (!checks.hasSpecial) errors.push('At least one special character (e.g. !@#$%^&*)')

  return {
    isValid: Object.values(checks).every(Boolean),
    checks,
    errors
  }
}
