// eslint.config.js
import antfu from '@antfu/eslint-config'

// https://github.com/antfu/eslint-config
export default antfu(
  {
    typescript: {
      overrides: {
        'perfectionist/sort-exports': 'off',
        'perfectionist/sort-imports': 'off',
        'ts/no-unused-expressions': ['error', { allowShortCircuit: true }],
      },
    },
    vue: {
      overrides: {
        'vue/no-unused-refs': 'off',
        'vue/no-reserved-component-names': 'off',
        'vue/component-definition-name-casing': 'off',
      },
    },
    rules: {
      'no-console': 'off',
      'vue/component-name-in-template-casing': [
        'warn',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: ['/^icon-local/'],
        },
      ],
      'vue/component-options-name-casing': ['warn', 'PascalCase'],
      'vue/custom-event-name-casing': ['warn', 'camelCase'],
      'vue/require-macro-variable-name': [
        'warn',
        {
          defineProps: 'props',
          defineEmits: 'emit',
          defineSlots: 'slots',
          useSlots: 'slots',
          useAttrs: 'attrs',
        },
      ],
      'vue/valid-define-options': 'warn',
    },
  },
)
