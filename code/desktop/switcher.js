AFRAME.registerSystem('screen-switch', {
    schema:{},
    init: function() {
        this.screens = {}
        console.log("setting up the screen-switch system")
        this.switchTo = (path) => {
            console.log("setting the path to",path,'from',this.initialPath)
            this.initialPath = path
            this.turnAllOff()
        }
        this.registerScreen = function(name, screen) {
            console.log("registering the screen",name,screen)
            this.screens[name] = screen
        }
    },
    setInitialPath: function(path) {
        this.initialPath = path
        console.log("initial path set to",path)
    },
    turnAllOff: function() {
        console.log('turning off all of the scenes',this.initialPath)
        Object.keys(this.screens).forEach(name =>{
            const screen = this.screens[name]
            if(name === this.initialPath) {
                screen.el.setAttribute('visible',true)
                return
            }
            // console.log("the screen is",name,screen)
            // console.log('vis is', screen.el.getAttribute('visible'))
            screen.el.setAttribute('visible',false)
            // screen.setAttribute('visible', false);
        })
    }

})

AFRAME.registerComponent('screen-switch', {
  schema: {
      screen:{
          type:'string'
      }
  },
  init: function() {
      console.log("setting up the screen-switch")
      const system = document.querySelector('a-scene').systems['screen-switch'];
      system.setInitialPath(this.data.screen)
  },
  play: function() {
      console.log("paying")
      const system = document.querySelector('a-scene').systems['screen-switch'];
      system.turnAllOff()
  }
})
function findParentWithComponent(el,comp) {
  if(!el) return null
  // console.log("looking at element",el)
  if(el.parentNode) {
      const parent = el.parentNode
      // console.log("checking the parent",parent)
      if(parent.hasAttribute(comp)) return parent
      return findParentWithComponent(parent,comp)
  }
  return null
}

AFRAME.registerComponent('screen', {
  // dependencies: ['screen-switch'],
  schema: {
      type:'string'
  },
  init: function() {
      const system = document.querySelector('a-scene').systems['screen-switch'];
      // console.log("in screen", this.data,'the system is', system)
      system.registerScreen(this.data,this)
      // console.log("setting up a screen",this.data)
      //switcher.components['screen-switch'].registerScreen(this.data,this)
  },
})


AFRAME.registerComponent('to-screen',{
  // dependencies: ['screen-switch'],
  schema: {
      type:'string'
  },
  init: function() {
      // console.log("setting up the to-screen",this.data)
      this.el.addEventListener('click', (e) => {
          // console.log("going to the screen", this.data);
          const system = document.querySelector('a-scene').systems['screen-switch'];
          system.switchTo(this.data)
          // const switcher = findParentWithComponent(this.el,'screen-switch')
          // console.log("the screen is",switcher.components['screen-switch'])
          // switcher.components['screen-switch'].switchTo(this.data)
      })
  }

})