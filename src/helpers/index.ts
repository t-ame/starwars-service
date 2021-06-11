export * from './mappers';
export * from './utility';

import { LoggerFactory } from './Logger';

const Logger = LoggerFactory.configure({
  id: 'starwars',
  type: { type: 'file', filename: `logs/starwars_logs_${Date.now()}` },
  level: 'all',
});

export { Logger };
