/**
 * Утилиты для хеширования и проверки паролей.
 * Код вдохновлен примером с GeeksforGeeks:
 * https://geeksforgeeks.org/node-js-password-hashing-crypto-module/
 *
 * Данный модуль предоставляет функции для безопасного хеширования паролей
 * и проверки введенных паролей по хешу.
 *
 * @module passwordService
 */

import { pbkdf2, randomBytes } from "node:crypto";

/**
 * Хеширует пароль с использованием PBKDF2 и соли.
 *
 * @async
 * @function hashPassword
 * @param {string} password - Пароль в виде обычного текста, который нужно захешировать.
 * @param {string} [salt=randomBytes(12).toString("hex")] - Необязательный параметр соли. Если соль не указана, генерируется новая.
 * @returns {Promise<{hash: string, salt: string}>} - Объект, содержащий хеш пароля и использованную соль.
 */
async function hashPassword(
  password: string,
  salt: string = randomBytes(12).toString("hex"),
): Promise<{ hash: string; salt: string }> {
  const hash = await new Promise<Buffer>((resolve, reject) =>
    pbkdf2(password, salt, 1000, 64, `sha512`, (error, value) =>
      error ? reject(error) : resolve(value),
    ),
  );

  return {
    hash: hash.toString(`hex`),
    salt,
  };
}

/**
 * Проверяет соответствие пароля и хеша.
 *
 * @async
 * @function comparePassword
 * @param {Object} params - Параметры для проверки.
 * @param {string} params.password - Пароль в виде обычного текста, который нужно проверить.
 * @param {string} params.hash - Хеш пароля, с которым нужно сравнить.
 * @param {string} params.salt - Соль, использованная при хешировании пароля.
 * @returns {Promise<boolean>} - Возвращает `true`, если пароль соответствует хешу, иначе `false`.
 */

async function comparePassword({
  hash,
  password,
  salt,
}: {
  password: string;
  hash: string;
  salt: string;
}): Promise<boolean> {
  return hash === (await hashPassword(password, salt)).hash;
}

export const passwordService = { comparePassword, hashPassword };
