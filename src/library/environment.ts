import { cleanEnv, makeValidator } from 'envalid';

const nonEmptyStr = makeValidator((value) => {
	if (value.trim() === '') throw new Error('Value cannot be an empty string');
	return value;
});

const envConfig = {
	ENVIRONMENT: nonEmptyStr({ choices: ['development', 'production'] }),
};

const cleanedEnv = cleanEnv(process.env, envConfig);

const isProduction = cleanedEnv.ENVIRONMENT === 'production';
const isDevelopment = cleanedEnv.ENVIRONMENT === 'development';

const bareDomain = 'dandigresses.co.uk';
const productionBaseURL = `https://${bareDomain}`;
const developmentBaseURL = 'http://localhost:3000';
const dynamicBaseURL = isProduction ? productionBaseURL : developmentBaseURL;

export const environment = {
	isProduction,
	isDevelopment,
	bareDomain,
	productionBaseURL,
	dynamicBaseURL,
} as const;

export const validateEnvironment = () => {
	cleanEnv(process.env, envConfig);
};
