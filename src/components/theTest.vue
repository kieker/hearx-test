<template>
    <div class="main_container">
        
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
                    if (this.runningtime > this.sounds[i].start && this.runningtime < this.sounds[i].stop)
                    {
                        this.soundIndex = i;
                    }}
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
    outline:none;
    box-shadow: 4px #000;
}
.results
{
    display:block;
    border-radius:5px;
    height:40px;
    width:90%;
    margin:auto;
    margin-top:20px;
}
</style>