import { addParameters, configure } from '@storybook/react';
const registerRequireContextHook = require('babel-plugin-require-context-hook/register')
import requireContext from 'require-context.macro';
// const req = requireContext('../src', true, /\.stories\.js$/);
registerRequireContextHook();
addParameters({
    options: {
      name: 'Codio',
      parameters: {
        docs: {
          inlineStories: false,
        },
      },
    },
  });


configure(require.context('../src', true, /\.stories\.js$/), module);