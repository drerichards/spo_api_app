module.exports = {
  arrowParens: 'avoid',
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  semi: false,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        singleQuote: true,
      },
    },
  ],
};
