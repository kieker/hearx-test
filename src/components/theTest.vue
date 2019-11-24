<!--
If I had more time, I would spend it here. 
I am not sure, but I think the first sound is played a bit late. I can't hear that high-pitched frequency.
I think the panning on the audio needs more work, it is not switching to mono. 
I am also not happy about the border that appears within the button when you click it, 
but haven't been able to locate the style that is applying it.
There is also a bug that is occuring on other pages relating to the logic in setSoundIndex on line 61. The bug doesn't interfere 
with the program as far as I can gather.  
Another issue is that the application doesn't use the files downloaded from the user computer, it uses the one from the server, 
which will become a problem if there are a lot of users doing the test at the same time if it is hosted from a central server 
and not deployed to the users computer. 
-->
<template>
    <div class="main_container">
        <h2>When you hear a sound, press the button. Your hearing loss (if any) will be calculated on how many times you pressed correctly.</h2>
        <button class="sound" @click="setScore(runningtime)"> <img src="@/assets/ear.png"/> I hear it! </button>
        <button class="results" v-if="runningtime >= totalTime" @click="toResults">See results</button>
    </div>
   
</template>
<script>
import {Howl} from 'howler';

export default {
    name: 'theTest',
    data() {
        return {
            score : 0,
            intervals : [],
            totalTime : 0,
            soundIndex : 0,
            runningtime: 0,
            sounds : [],
              urls : [
             '../../audio/1kHz_44100Hz_16bit_05sec.wav',
             '../../audio/1kHz_44100Hz_16bit_05sec.wav',
             '../../audio/10kHz_44100Hz_16bit_05sec.wav',
             '../../audio/10kHz_44100Hz_16bit_05sec.wav',
             '../../audio/100Hz_44100Hz_16bit_05sec.wav',
             '../../audio/100Hz_44100Hz_16bit_05sec.wav',             
             '../../audio/250Hz_44100Hz_16bit_05sec.wav',
             '../../audio/250Hz_44100Hz_16bit_05sec.wav',
             '../../audio/440Hz_44100Hz_16bit_05sec.wav',
             '../../audio/440Hz_44100Hz_16bit_05sec.wav',
              ],
            soundClips : [],
        }
    },
    mounted()  {
        this.setJitter()
        this.calculateSounds()
        
        this.initialiseSound()
        this.startTimer()
        this.playSound()

       
    },
    destroyed() {
        clearInterval()
    },
    methods: {
        setSoundIndex() {
            for (var i = 1 ; i <= 10; i++)
            {  
                if (this.sounds[i].start)
                {
                    if (this.runningtime > this.sounds[i].start && this.runningtime < this.sounds[i].stop)
                    {
                        this.soundIndex = i;
                    }
                }
            }
        },
        generateJitter() {
            let randomFloat = Math.floor(Math.random() * 2000) + 3000;
            return randomFloat
        },
        setJitter() {
            for (var i = 1 ; i <= 10; i++)
            {
                let silence = this.generateJitter();
                this.totalTime += silence;
                this.intervals.push(silence);
            }
            this.totalTime += 10000;
            return
        },
        setScore() {

            for (var i = 0 ; i < 10; i++)
            {
                if (this.runningtime > this.sounds[i].start && this.runningtime < this.sounds[i].stop &&  this.sounds[i].scored != true) {
               
                    this.score++;
                    this.sounds[i].scored = true
                }
            }
            
        }, 
        
        startTimer()
        {
            let data = this
              setInterval( function(){              
                data.runningtime+=250;        
                data.setSoundIndex()
                if (data.runningtime >= data.totalTime)  
                {
                    clearInterval();
                }
                
              },250 )
        },
        calculateSounds(){
            let running = -1010
            for (var i = 0 ; i < 10; i++)
            {
                let sound = this.intervals[i] + 1
                running += sound + 1000;
                this.sounds.push({'start': running, 'stop':  running + 1000, 'scored' : false  })
            }


        },
        initialiseSound() {
            let soundclip = []
            let set_stereo = -1
            for (var j = 0 ; j < 10; j++)
            {
                if (j % 2 == 0)  {
                    set_stereo = 1
                }
                soundclip[j] = new Howl({
                src: [this.urls[j]],
                stereo : set_stereo
                });
                this.soundClips.push(soundclip[j])
            }
        },
        playSound()
        {
             
                if (this.runningtime >= this.sounds[this.soundIndex].start && this.runningtime < this.sounds[this.soundIndex].stop) {
                    this.soundClips[this.soundIndex].play();                        
                    }
                    else{
                        this.soundClips[this.soundIndex].stop()
                    }

                         
        },
        toResults() {
              this.$store.dispatch('saveResults', this.score)
           this.$router.push({path: '/results'})
        },


    },
    watch:{
        soundIndex() {

            this.soundClips[this.soundIndex].play()
             this.soundClips[this.soundIndex].fade(1,0,1000)


        }
    }
}
</script>
<style scoped>
.main_container
{
    width:100%;
    max-width:800px;
    margin:auto;
    position:absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    max-height:450px;
}
.sound {
    border-radius: 50%;
    border:none;
    padding-bottom:35px;
    width:245px;
    height:245px;
    cursor:pointer
}
.sound:hover {
    box-shadow:5px #000;
}
.sound:focus
{
    outline:0;
    box-shadow: 4px rgb(248, 228, 228);
    border:none;
}
.sound:active{
    outline:0;
}
.sound img:active{
    outline:0;
}
.results
{
    display:block;
    border-radius:5px;
    height:40px;
    width:90%;
    margin:auto;
    margin-top:60px;
}

</style>