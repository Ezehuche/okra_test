import { auth } from 'src/scrapers/okraBank/auth';

export const okraBank = async (
  email: string,
  password: string,
  otp: string,
) => {
  return await auth(email, password, otp);
};
