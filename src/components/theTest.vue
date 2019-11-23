<template>
    <div>
        Test <br/>
        <button class="sound" @click="setScore(runningtime)"> <img src="@/assets/ear.png"/> I hear it! </button>
        <button v-if="runningtime >= totalTime">See results</button>
    </div>
   
</template>
<script>

export default {
    name: 'theTest',
    data() {
        return {
            score : 0,
            
            intervals : [],
            totalTime : 0,
            runningtime: 0,
            sounds : [],
              urls : {
            '1'  : '../../audio/1kHz_44100Hz_16bit_05sec.wav',
            '10' : '../../audio/10kHz_44100Hz_16bit_05sec.wav',
            '100': '../../audio/100Hz_44100Hz_16bit_05sec.wav',
            '250': '../../audio/250Hz_44100Hz_16bit_05sec.wav',
            '440': '../../audio/440Hz_44100Hz_16bit_05sec.wav',
        },
        }
    },
    mounted()  {
        this.setSilence()
        this.calculateSounds()
        this.startTimer()
    },
    methods: {
        generateSilence() {
            let randomFloat = Math.floor(Math.random() * 2000) + 3000;
            return randomFloat
        },
        setSilence() {
            for (var i = 1 ; i <= 10; i++)
            {
                let silence = this.generateSilence();
                this.totalTime += silence;
                this.intervals.push(silence);
            }
            this.totalTime += 10000;
            return
        },
        setScore(runtime) {

            for (var i = 0 ; i < 10; i++)
            {
                if (runtime > this.sounds[i].start && runtime < this.sounds[i].stop) {
                    this.score++;
                }
            }
            return
        }, 
        startTimer()
        {
            let data = this
              setInterval( function(){              
                data.runningtime+=1000;           
              },1000 )
            //  if (data.runningtime === data.totalTime) {
            //         return;
            //     }
            
           return
        },
        calculateSounds(){
            for (var i = 0 ; i < 10; i++)
            {
                let sound = this.intervals[i] + 1000
                this.sounds.push({'start': this.intervals[i] + 1, 'stop':  sound  })
            }

        },
        playSound()
        {

        }
        

    }
}
</script>
<style scoped>
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
</style>