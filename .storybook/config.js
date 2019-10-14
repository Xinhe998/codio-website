import { addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';
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