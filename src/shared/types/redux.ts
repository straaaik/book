// eslint-disable-next-line fsd/forbidden-imports
import { makeStore } from '@/app/config/store/store';

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
