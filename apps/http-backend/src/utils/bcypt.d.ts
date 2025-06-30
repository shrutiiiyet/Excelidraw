/**
 * Hash a password using bcrypt with a salt round of 10.
 * @param password - The plain text password to hash.
 * @returns The hashed password as a string.
 */
export declare const hashPassword: (password: string) => Promise<string>;
/**
 * Verify if a given password matches a hashed password.
 * @param password - The plain text password to check.
 * @param hashedPassword - The stored hashed password.
 * @returns A boolean indicating whether the passwords match.
 */
export declare const verifyPassword: (password: string, hashedPassword: string) => Promise<boolean>;
//# sourceMappingURL=bcypt.d.ts.map