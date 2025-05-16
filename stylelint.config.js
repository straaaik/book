/* eslint-disable import/no-anonymous-default-export */
// /** @type {import('stylelint').Config} */
export default {
    extends: ['stylelint-config-standard-scss'],
    plugins: ['stylelint-require-units'],
    rules: {
        'selector-class-pattern': null,
        'keyframes-name-pattern': null,
        'matterialize/stylelint-require-units': [true],
    },
};
