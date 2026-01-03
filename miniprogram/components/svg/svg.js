import icons from './icons'

Component({
    properties: {
      extClass: {
          type: String,
          value: ''
      },
      name: {
          type: String,
          value: '',
          observer: '_genIcon'
      },
      size: {
          type: String,
          value: '100%'
      },
      color: {
          type: String,
          value: '',
          observer: '_genColor'
      }
    },
    data: {
        src: '',
        currentColor: ''
    },
    // observers: {
    //   'name, color': function(name, color) {
    //     const old = this.data.currentColor
    //     const regex = new RegExp(this.data.currentColor, 'g');
    //     this.setData({
    //       src: 'data:image/svg+xml;charset=utf8,' + icons[name].replace(regex, `${color}`),
    //       currentColor: color
    //     })
    //     console.log(this.data.name, old, color, this.data.src)
    //   },
    // },
    methods: {
      _genIcon(name) {
        if (icons[name]) {
          this.setData({
              // src: 'data:image/svg+xml;charset=utf8,' 
              //       + icons[v].replace(/currentColor/g, `${this.data.color}`)
              src: 'data:image/svg+xml;charset=utf8,' + icons[name],
              currentColor: 'currentColor'
          })
        }
      },

      _genColor(color) {
        // const old = this.data.currentColor
        if (this.data.src !== '') {
          const regex = new RegExp(this.data.currentColor, 'g');
          this.setData({
            src: this.data.src.replace(regex, `${color}`),
            currentColor: color
          })
        }
        // console.log('_genColor', this.data.name, old, color, this.data.src)
      }
    }
})