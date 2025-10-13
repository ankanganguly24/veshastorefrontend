/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} phone
 * @property {string} email
 * @property {boolean} is_email_verified
 * @property {boolean} is_phone_verified
 * @property {string|null} email_verified_at
 * @property {string|null} phone_verified_at
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string|null} deleted_at
 */

/**
 * @typedef {Object} ApiResponse
 * @template T
 * @property {boolean} success
 * @property {string} message
 * @property {T} data
 */

/**
 * @typedef {Object} AuthResponse
 * @property {User} user
 */

/**
 * @typedef {Object} LoginRequest
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterRequest
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} phone
 * @property {string} email
 * @property {string} password
 */
