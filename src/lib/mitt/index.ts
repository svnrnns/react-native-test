import { useEventEmit } from './useEventEmit';
import { useEventListener } from './useEventListener';

// TypeScript
import { EventCallback, EventMap } from './types';

const eventEmit = useEventEmit;

export { eventEmit, useEventEmit, useEventListener };
export type { EventCallback, EventMap };
