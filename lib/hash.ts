/**
 * NOTE: This is a placeholder hashing function for the Level 1 frontend-only
 * demo, where there is no real backend yet. It is NOT cryptographically
 * secure and must NOT be used in production. Once a real backend/API is
 * introduced (see later levels), replace this with server-side bcrypt/argon2
 * password hashing, as required by the challenge's security rules (Level 7).
 */
export function demoHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const chr = password.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return `demo_${Math.abs(hash)}_${password.length}`;
}
