<template lang="pug">
main
  .einstein(v-cloak)
    .menu
      .container-fluid
        .row.no-gutters.justify-content-center
          .col-12
            h1(style='text-center') Einstein Program: Chipless RFID
            h1.ch 愛因斯坦培植計畫：<br>無晶片式射頻辨識
          .col-12.col-lg-10.text-right.mt-3
            transition(name='fade')
              nav.nav(v-if='!einstein')
                a.nav-link(v-for='i in 6')
                  .loading-text-block
              nav#einstein-menu.nav(v-else)
                a.nav-link(href='#', :class="(e_index==currentPage)?'active':''", @click.prevent='setEinsteinCurrPage(e_index)', v-for='(e,e_index) in einstein')
                  | {{(!language) ? e.name : e.name_en}}

    .content
      // Loader
      .container(v-if='!einstein')
        h2.subtitle.no-underline.mt-0(style={borderWidth: 0}) #[.loading-text-block]
        section
          .row
            .col-12.col-md-12
              p #[.loading-text-block(v-for='i in 3' :style='{width: (i == 3) ? `80%`: `100%`}')]

      .container(v-else)
        h2.subtitle.mt-0 {{(!language) ? einstein[currentPage].name : einstein[currentPage].name_en}}

        transition(mode='out-in' name='fadeMove')
          section(v-if="einstein[currentPage].page == 'purpose'", key='0')
            .row
              .col-12.col-md-12(v-for='i in einstein[currentPage].content')
                img.img-fluid.figure.figure-float(:src='i.img')
                p(v-html='selectTextLanguage(language, i.content, i.content_en)')

          section(v-else-if="einstein[currentPage].page == 'scope'", key='1')
            .row
              .col-12.col-md-12(v-for='i in einstein[currentPage].content')
                img.img-fluid.figure.figure-float(:src='i.img')
                p(v-html='selectTextLanguage(language, i.content, i.content_en)')

          section.container-fluid(v-else-if="einstein[currentPage].page == 'equipment'", key='2')
            .row(v-for='i in einstein[currentPage].content')
              .col-12.col-lg-4.mb-3.mb-lg-5
                img.img-fluid(:src='i.img', alt='Figure')
              .col-12.col-lg-8.mb-5
                h4 {{selectTextLanguage(language, i.title, i.title_en)}}
                p(v-html='selectTextLanguage(language, i.content, i.content_en)')

          section(v-else-if="einstein[currentPage].page == 'demonstration'", key='3')
            template(v-for='i in einstein[currentPage].content')
              .row
                .col-12.col-lg-9.order-2.order-lg-1
                  h5
                    a(:href='i.link' target='_blank' v-if='i.link') {{ selectTextLanguage(language, i.title, i.title_en) }}
                    template(v-else) {{ selectTextLanguage(language, i.title, i.title_en) }}
                  p(v-html='selectTextLanguage(language, i.content, i.content_en)')
                  a.ui.label(v-if="i.attachment" :href='i.attachment' target='_blank') #[fa(icon='file-pdf')]
                  a.ui.label(v-if="translateYoutubeLink(i.youtube) != ''" @click='showModalYoutube(i.youtube)')
                    fa.text-danger(:icon='[`fab`, `youtube`]')
                    |  Youtube
                .col-12.col-lg-3.mb-3.order-1.order-lg-2
                  img.img-fluid.figure.m-0(:src='i.img')

              hr

          section(v-else-if="einstein[currentPage].page == 'press'", key='4')
            .ui.divided.very.relaxed.list
              .item.bg-light.px-3.py-3(style='line-height:1.5rem', v-for='i in einstein[currentPage].content')
                h5.mb-0
                  a(:href='i.link', target='_blank') {{selectTextLanguage(language, i.title, i.title_en)}}
                small {{selectTextLanguage(language, i.source, i.source_en)}} | {{i.date}}
                a.ui.label.mt-2(v-if="translateYoutubeLink(i.youtube) != ''", @click='showModalYoutube(i.youtube)')
                  fa.text-danger(:icon='[`fab`, `youtube`]')
                  |  Youtube


          section(v-else-if="einstein[currentPage].page == 'partnerships'", key='5')
            p.mb-5(v-html='selectTextLanguage(language, einstein[currentPage].content.content, einstein[currentPage].content.content_en)')

            .row.justify-content-center.text-center
              .col-12.col-lg-auto.mb-3(v-for='i in einstein[currentPage].content.logo')
                img.img-fluid(:src='i.img', style='max-height:80px')


    #modal-youtube.modal.fade(tabindex='-1', role='dialog')
      .modal-dialog.modal-lg.modal-dialog-centered(role='document')
        .modal-content
          .modal-header(hidden)
            button.close(type='button', data-dismiss='modal')
              span ×
          .modal-body.text-center
            .embed-responsive.embed-responsive-16by9
              iframe.embed-responsive-item(:src='modalYoutubeLink', allowfullscreen)
          .modal-footer.pointer.justify-content-center(data-dismiss='modal')
            div
              fa(icon='times')
              |  {{(!language)? '關閉' : 'Close'}}
</template>

<script>
import { page } from '@/mixins/page.js'

export default {
  data () {
    return {
      einstein: null,
      currentPage: 0,
      modalYoutubeLink: ``,
    }
  },
  mounted () {
    this.setBg()
    this.fetch('einstein')
    $('#modal-youtube').on('hidden.bs.modal', () => {
      self.modalYoutube = ''
    })
  },
  methods: {
    setEinsteinCurrPage: function(n) {
      this.currentPage = n
    },
    showModalYoutube (url) {
      this.modalYoutubeLink = this.translateYoutubeLink(url)
      $('#modal-youtube').modal('show')
    },
  },
  mixins: [page]
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_einstein.sass"

</style>
