import { NextApiRequest, NextApiResponse } from 'next';
import winston from 'winston';

type Level = 'verbose' | 'info' | 'warn' | 'error' | 'debug' | 'silly';
const level: Level = 'info';

export const logger = winston.createLogger({
	level: level,
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		winston.format.align(),
		winston.format.printf(
			(info) => `${info.timestamp} ${info.level}: ${info.message}`
		)
	),
	transports: [new winston.transports.Console()],
});

export const loggerMiddleware = (
	req: NextApiRequest,
	res: NextApiResponse,
	next: () => void
) => {
	const start = Date.now();

	res.on('finish', () => {
		const duration = Date.now() - start;
		const message = `${req.method} ${req.url} ${res.statusCode} ${duration}ms`;

		if (res.statusCode >= 400) {
			logger.error(message);
		} else {
			logger.info(message);
		}
	});

	next();
};

export const logError = (error: Error, context?: string) => {
	logger.error(`${context ? context + ': ' : ''}${error.message}`, {
		stack: error.stack,
	});
};

export const logAPIError = (
	req: NextApiRequest,
	res: NextApiResponse,
	error: Error
) => {
	logger.error(`API Error: ${req.method} ${req.url}`, {
		error: error.message,
		stack: error.stack,
		query: req.query,
		body: req.body,
	});
};
