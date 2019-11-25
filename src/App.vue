<!--
I think overall this app works well, but there are a few bugs relating to functionality as well as style. 
This was the first time that I've used Vue. I started learning it last Wednesday. I know a bit of React,
but I think I like Vue a lot more. Please consider that this was my first attempt when reviewing the code. 
As I am not sure that I used the conventional way of doing things. 

I would like to improve on:
- The page load transitions for the app. 
- Bring in the option for a light/dark mode. As I know I lot of people prefer 
  the one over the other, I've used my preference here. 

I have tested this in firefox and chrome. IE compatibility isn't 100%. 
I haven't tested this on safari, as I don't own a Mac. 

In hindsight, something like Sass or Less would have been better for styling maybe, but I really like it that we
can have scoped styles. 


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
