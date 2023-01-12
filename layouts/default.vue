<template>
  <div class="d-flex flex-column h-100">
    <header>
      <!-- Fixed navbar -->
      <b-navbar toggleable="xl" type="dark" variant="dark" class="fixed-top">
        <b-navbar-brand to="/" title="strona główna"><logo /></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              v-if="!modeSwitcher"
              href="#"
              style="list-style: none"
              :link-attrs="{ title: 'tryb jasny' }"
              @click.prevent="setColorModeTheme('light')"
            >
              <b-icon
                :icon="$colorMode.preference == 'dark' ? 'sun' : 'sun-fill'"
                :class="
                  $colorMode.preference == 'light'
                    ? 'text-warning'
                    : 'text-warning'
                "
              ></b-icon>
            </b-nav-item>
            <b-nav-item
              v-if="!modeSwitcher"
              href="#"
              style="list-style: none"
              :link-attrs="{ title: 'tryb ciemny' }"
              @click.prevent="setColorModeTheme('dark')"
            >
              <b-icon
                :icon="$colorMode.preference == 'light' ? 'moon' : 'moon-fill'"
                :class="
                  $colorMode.preference == 'light' ? 'text-white' : 'text-white'
                "
              ></b-icon>
            </b-nav-item>
            <b-nav-item
              v-if="modeSwitcher"
              href="#"
              style="list-style: none"
              :link-attrs="{
                title:
                  'włącz tryb ' +
                  ($colorMode.preference == 'dark' ? 'jasny' : 'ciemny'),
              }"
              @click.prevent="
                setColorModeTheme(
                  $colorMode.preference == 'dark' ? 'light' : 'dark'
                )
              "
            >
              <b-icon
                :icon="$colorMode.preference == 'dark' ? 'sun' : 'sun-fill'"
                :class="
                  $colorMode.preference == 'light'
                    ? 'text-warning'
                    : 'text-warning'
                "
              ></b-icon>
              /
              <b-icon
                :icon="$colorMode.preference == 'light' ? 'moon' : 'moon-fill'"
                :class="
                  $colorMode.preference == 'light' ? 'text-white' : 'text-white'
                "
              ></b-icon>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <main class="flex-shrink-0" :class="$colorMode.preference + '-theme'">
      <b-container fluid>
        <nuxt />
      </b-container>
    </main>
    <footer
      class="footer mt-auto py-3"
      :class="$colorMode.preference == 'light' ? 'bg-light' : 'bg-dark'"
    >
      <div class="container-fluid">
        <span
          :class="$colorMode.preference == 'light' ? 'text-dark' : 'text-white'"
        >
          Copyrights&copy; {{ currentYear }} Paweł Wilczek
        </span>
      </div>
    </footer>
    <b-toast
      id="cookies-toast"
      variant="secondary"
      solid
      no-auto-hide
      no-close-button
      toaster="b-toaster-bottom-right"
    >
      Ta strona korzysta z cookies, aby świadczyć usługi na najwyższym poziomie.
      Dalsze korzystanie ze strony oznacza, że zgadzasz się na ich użycie.
      <button
        class="btn btn-primary"
        style="background-color: #0051a8"
        @click.prevent="acceptCookies()"
      >
        Zgoda
      </button>
      <ExternalLink
        rel="nofollow"
        class="btn btn-link"
        style="color: #0051a8"
        anchor="Dowiedz się więcej"
        page="http://wszystkoociasteczkach.pl"
        >Dowiedz się więcej</ExternalLink
      >
    </b-toast>
    <b-toast
      id="update-toast"
      variant="secondary"
      solid
      no-auto-hide
      no-close-button
      toaster="b-toaster-top-right"
    >
      <div class="mb-2">Strona została zaktualizowana.</div>
      <button
        v-if="false"
        class="btn btn-primary"
        style="background-color: #0051a8"
        @click.prevent="closeUpdateToast(true)"
      >
        Teraz
      </button>
      <button
        class="btn btn-primary"
        style="background-color: #0051a8"
        @click.prevent="closeUpdateToast(false)"
      >
        OK
      </button>
    </b-toast>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  data() {
    return {
      modeSwitcher: false,
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
  async mounted() {
    const workbox = await window.$workbox
    if (workbox) {
      workbox.addEventListener('installed', (event) => {
        // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
        if (event.isUpdate) {
          // whatever logic you want to use to notify the user that they need to refresh the page.
          console.log('Update was applied. :-D')
          // this.$bvToast.show('update-toast')
        }
      })
    }
    if (!this.$cookies.get('isCookiesAccepted'))
      this.$bvToast.show('cookies-toast')
  },
  methods: {
    acceptCookies() {
      this.$cookies.set('isCookiesAccepted', true, {
        maxAge: 60 * 60 * 24 * 366 * 10,
      })
      this.$bvToast.hide('cookies-toast')
    },
    closeUpdateToast(reload) {
      this.$bvToast.hide('update-toast')
      if (reload === true) window.location.reload(true)
    },
    setColorModeTheme(color) {
      this.$colorMode.preference = color
      this.$cookies.set('colorModeTheme', color, {
        maxAge: 60 * 60 * 24 * 366,
      })
    },
  },
}
</script>

<style>
body {
  font-family: Roboto, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body,
.light-theme {
  background-color: rgb(239 239 239 / 100%);
  color: rgba(0 0 0 / 80%);
}

.dark-mode body,
.dark-theme {
  background-color: rgb(38 39 47 / 100%);
  color: #ebf4f1;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

main {
  padding: 90px 15px 0;
}

.footer {
  background-color: #f5f5f5;
}

.footer > .container-fluid {
  padding-right: 15px;
  padding-left: 15px;
}

.logo {
  animation: 1s appear;
}

@keyframes appear {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
