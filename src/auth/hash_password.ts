import * as bcrypt from 'bcrypt';
export async function hashPass(password): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}
