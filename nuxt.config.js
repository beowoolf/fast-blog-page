export default {
  // target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'pl',
      class: 'h-100',
    },
    headAttrs: {
      itemscope: true,
      itemtype: 'https://schema.org/WebPage',
    },
    bodyAttrs: {
      class: 'd-flex flex-column h-100',
    },
    title: 'Blog - mojezapiski.pl',
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        defer: true,
        src: '//cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/node_modules/bootstrap/dist/css/bootstrap.min.css',
    '~/node_modules/bootstrap-icons/font/bootstrap-icons.css',
    '~/assets/body.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/jsonld'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
    'nuxt-compress',
  ],

  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxt/image',
    'cookie-universal-nuxt',
    'nuxt-compress',
    '@nuxtjs/sitemap',
  ],

  googleFonts: {
    display: 'swap',
    families: {
      Roboto: {
        wght: [400, 700],
      },
    },
  },

  'nuxt-compress': {
    gzip: {
      threshold: 8192,
    },
    brotli: {
      threshold: 8192,
    },
  },

  sitemap: {
    hostname: 'https://mojezapiski.pl', // process.env.HOSTNAME // default; format e.g. 'http://localhost:3000'
    trailingSlash: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'MojeZapiski.pl',
      short_name: 'MojeZapiski.pl',
      theme_color: '#007bff',
      lang: 'pl-PL',
    },
    workbox: {
      offlineAssets: [
        '/_ipx/f_webp/logo.png',
        '/_ipx/fit_cover,f_webp,s_800x600/images/yancy-min-842ofHC6MaI-unsplash.jpg',
        '/_ipx/fit_cover,f_webp,s_800x600/images/ferenc-almasi-tvHtIGbbjMo-unsplash.jpg',
        '/_ipx/fit_cover,f_webp,s_800x600/images/melanie-deziel-U33fHryBYBU-unsplash.jpg',
        '/_ipx/fit_cover,f_webp,s_800x600/images/myriam-jessier-VHXiGXxwOQ4-unsplash.jpg',
      ],
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map'
      }
    },
  },

  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
    presets: {
      preview: {
        modifiers: {
          fit: 'cover',
          width: 400,
          height: 300,
        },
      },
    },
  },

  publicRuntimeConfig: {
    website: {
      publicTest: 'public1',
      bothTest: 'public2',
      baseUrl: 'https://mojezapiski.pl',
      companyName: 'MojeZapiski.pl',
    },
  },
  privateRuntimeConfig: {
    website: {
      privateTest: 'private1',
      bothTest: 'private2',
    },
  },
  router: {
    // ran before every route on both client and server
    middleware: ['redirectsMiddleware', 'colorModeMiddleware'],
  },
}
