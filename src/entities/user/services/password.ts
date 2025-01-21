import { pbkdf2, randomBytes } from "node:crypto";

function hashPassword(
  password: string,
  salt = randomBytes(12).toString("hex"),
) {
  //Промисификация криптографии
  return new Promise<Buffer>((resolve, reject) =>
    pbkdf2(password, salt, 1000, 64, `sha512`, (error, value) =>
      error ? reject(error) : resolve(value),
    ),
  ).then((r) => r.toString(`hex`));
}

async function comparePassword({
  hash,
  password,
  salt,
}: {
  password: string;
  hash: string;
  salt: string;
}) {
  return hash === (await hashPassword(password, salt));
}

export const passwordService = { comparePassword, hashPassword };
