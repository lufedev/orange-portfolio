module.exports = {
  plugins: [
    'tailwindcss',
    [
      {
        allowDuplicates: false,
      },
    ],
    [
      {
        content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/Components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    ],
    'autoprefixer',
  ],
};
