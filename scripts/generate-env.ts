import { randomBytes } from 'crypto';
import * as fs from 'fs/promises';

const envMap = {
  NODE_ENV: 'development',
  PORT: '4000',
  DB_TYPE: 'postgres',
  DB_HOST: 'localhost',
  DB_PORT: '5432',
  DB_USERNAME: 'postgres',
  DB_PASSWORD: 'password123',
  DB_DATABASE: 'auction',
  POSTGRES_SSL_CERT: '',
  JWT_EXPIRY_TIME: '30d',
};

const main = async () => {
  // Secret Key
  envMap['SECRET_KEY'] = randomBytes(20).toString('hex');
  envMap['JWT_SECRET'] = randomBytes(40).toString('hex');

  const envFile = Object.entries(envMap)
    .reduce((acc, [key, value]) => {
      acc.push(`${key}=${value}`);

      return acc;
    }, [] as string[])
    .join('\n');

  await fs.writeFile('.env', envFile);
};

main();
