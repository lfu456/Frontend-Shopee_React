const plugin = require('tailwindcss/plugin')


/** @type {import('tailwindcss').Config} */

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    corePlugins:{
      container:false
    },
    theme: {
      fontFamily:{
        'item': ' Helvetica Neue, Helvetica, Arial, 文泉驛正黑, WenQuanYi Zen Hei, Hiragino Sans GB, 儷黑 Pro, LiHei Pro, Heiti TC, 微軟正黑體, Microsoft JhengHei UI, Microsoft JhengHei, sans-serif'
      },
      extend: {
        colors:{
          orange:'#ee4d2d',
          textItem:'rgba(0, 0, 0, 0.8)',
          textGreen:'#26aa99'
        }
      },
    },
    plugins: [
      plugin(function({addComponents,theme}){
        addComponents({
          '.container':{
            maxWidth:theme('columns.7xl'),
            marginLeft:'auto',
            marginRight:'auto',
            paddingLeft:theme('spacing.4xl'),
            paddingRight:theme('spacing.4xl')

          }
        })
      })
    ],
  }