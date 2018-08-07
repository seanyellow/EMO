import * as config from '@/config'
import JumbotronTitle from '@/components/JumbotronTitle.vue'

const page = {
  data () {
    return {}
  },
  methods: {
    setBg () {
      let url = ``
      this.pages.forEach((val) => {
        if(val.page === this.$route.name) url = val.img
      })
      if(this.$route.name === `index`) url = `img/title/1.jpg`
      return {
        backgroundImage: `url('${url}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: `fixed`,
      }
    },
    fetch (page) {
      const vm = this
      config.dbRef.child(`${page}`).once('value', function(snap) {
        vm[page] = snap.val()
      })
    },
    fetchCarousel (child) {
      const vm = this
      config.dbRef.child('carousel').child(child).once('value', function(snap) {
        vm.carousel = snap.val()
        $('#carousel').carousel({
          interval: vm.carousel.interval,
        })
      })
    },
    // 取得Thesis列表各項目封面圖之style
    getThesisItemStyle (img) {
      return { backgroundImage: `url("${img}")` }
    },
    getThesisItemLink(category, id) { // 取得Thesis列表各項目連結網址
      if (this.$route.name == 'thesis')
        return `/thesis/${category}/${id}`
      else
        return `/project/${category}/${id}`
    },
    showModalImg (img) {
      this.modalImg = img
      $('#modal-img').modal('show')
    }
  },
  components: {
    JumbotronTitle,
  },
  props: ['language']
}

export { page }