export type * from './auth';

import type { Auth } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    flash?: {
        success?: string;
        info?: string;
        error?: string;
    };
    [key: string]: unknown;
};
