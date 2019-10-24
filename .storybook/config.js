import { addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';
const registerRequireContextHook = require('babel-plugin-require-context-hook/register')

registerRequireContextHook();
addParameters({
    options: {
      name: 'Codio',
      parameters: {
        docs: {
          inlineStories: false,
        },
      },
      // theme: themes.dark,
    },
  });


configure(require.context('../src', true, /\.stories\.js$/), module);