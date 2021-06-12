export * from './mappers';
export * from './utility';

import { LoggerFactory } from './Logger';

const Logger = LoggerFactory.configure({
  id: 'starwars',
  type: { type: 'console' },
  level: 'info',
});

export { Logger };
