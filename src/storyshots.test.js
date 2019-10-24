import initStoryshots from '@storybook/addon-storyshots';

// Runner
initStoryshots({
  storyKindRegex: /^((?!.*?Editors|DateInput).)*$/,
});
