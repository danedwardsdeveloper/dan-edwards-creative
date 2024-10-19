const requiredEnvironmentVariables = ['BARE_DOMAIN'] as const;

type EnvironmentVariables = (typeof requiredEnvironmentVariables)[number];

type Environment = {
	[Key in EnvironmentVariables]: string;
};

const environment = {} as Environment;

for (const environmentVariable of requiredEnvironmentVariables) {
	const value = process.env[environmentVariable];
	if (!value) {
		throw new Error(
			`Missing required environment variable: ${environmentVariable}`
		);
	}
	environment[environmentVariable] = value;
}

export { environment };
