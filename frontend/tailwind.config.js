module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      colors: {
        'black': '#0f0f10',
        'blue': '#0e60d8',
        'white': '#fff',
        'background' : '#191a1f',
        'sidebar' : '#141519',
        'color-text' : '#777989',
        'primaryColor':'#76417e',
        'comment':'#202227',
        'gray' : '#ccc',
        'filter' : '#606266',
        'btn-table' : '#eccaf1',
        'color-drawer':'#6f7882',
        'tab-bg-second' : '#ececec',
        'error': '#c72c31'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        primary : ['Montserrat','sans-serif']
      },
      extend: {
        boxShadow: {
          'bsd-bottom': 'rgb(47 47 47 / 40%)  0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;',
          'brand': 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;',
        },
      },
    },
    plugins: [],
}