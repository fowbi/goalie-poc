import bcrypt from 'bcryptjs';

export const encrypt = (value: string): string => bcrypt.hashSync(value, 10);
export const validate = (value: string, hash: string): boolean => bcrypt.compareSync(value, hash);
