import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import fsdPlugin from 'eslint-plugin-fsd-lint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),

    {
        plugins: {
            fsd: fsdPlugin,
        },
        rules: {
            'react/display-name': 'off',

            // ---- FDS -----
            'fsd/forbidden-imports': [
                'error',
                {
                    alias: {
                        value: '@',
                        withSlash: false,
                    },
                },
            ],
            'fsd/no-relative-imports': [
                'off',
                {
                    ignoreImportPatterns: ['\\.scss', '\\.css'],
                },
            ],
            'fsd/no-public-api-sidestep': 'error',
            'fsd/no-cross-slice-dependency': 'error',
            'fsd/no-ui-in-business-logic': 'error',
            'fsd/no-global-store-imports': 'off',
            'fsd/ordered-imports': 'off',
        },
    },
];

export default eslintConfig;
