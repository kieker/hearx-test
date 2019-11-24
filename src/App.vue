<!--
I think overall this app works well, but there are a few bugs relating to functionality as well as style
I would also want to improve on the page load transitions for the app. 
I have tested this in firefox and chrome. IE compatibility isn't 100%. 
I haven't tested this on safari, as I don't own a Mac. In hindsight, 
something like Sass or Less would have been better for styling maybe, but I like it that we can have scoped styles. 
-->
<template>
  <div id="app">
    <transition 
    name="fade"
    mode="in-out"
      @beforeLeave="beforeLeave"
       @enter="enter"
        @afterEnter="afterEnter"><router-view/></transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
 data() {
    return {
      prevHeight: 0,
    };
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
  },

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
