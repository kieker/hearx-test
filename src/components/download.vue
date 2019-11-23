

<template>
<div class="main_container">
    <button @click="downloadFiles" class="downloadButton"> Download Files </button>
    <button @click="proceedToDetails" :disabled="this.downloaded != 5" class="proceedButton"> Proceed to next step </button>
    <downloadBar :progress={downloadPercent}></downloadBar>
    </div>
</template>
<script>

import downloadBar from './downloadBar';

import axios from 'axios';

export default  {
    name : "download",
    data() {
    return {
  
        urls : {
            '1'  : '../../audio/1kHz_44100Hz_16bit_05sec.wav',
            '10' : '../../audio/10kHz_44100Hz_16bit_05sec.wav',
            '100': '../../audio/100Hz_44100Hz_16bit_05sec.wav',
            '250': '../../audio/250Hz_44100Hz_16bit_05sec.wav',
            '440': '../../audio/440Hz_44100Hz_16bit_05sec.wav',
        },
        totalFiles : 5,
        downloaded : 0,
        downloadPercent: 0,
    }
    },
    methods : {
        downloadFiles() {
        let data = this;
             Object.keys(data.urls).map(function(key)
             {
                
                axios({
                        url: data.urls[key], 
                        method: 'GET',
                        responseType: 'blob', 
                }).then((response) => {
                    if (global.vm.$browserDetect.isIE)
                    {
                        var FileSaver = require('file-saver');

                        FileSaver.saveAs(new Blob([response.data]));
                    }
                    else
                    {

                    
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', data.urls[key] ); 
                    document.body.appendChild(link);
                    
                    link.click();
                    }
                    // data.increaseProgress()
                    data.downloaded++;
                    data.downloadPercent = (data.downloaded / data.totalFiles)  * 100;

                }).catch(() =>{
                    data.downloaded--;
                });
            })
 
        },
        proceedToDetails() {
            this.$router.push({ path: '/details'})
        },
        increaseProgress() {
            while (this.downloadPercent <= (100 / this.downloaded ) )
            {
                this.downloadPercent++;
            }
            return;
        }
    },
    components:{
        downloadBar,
    }
}
</script>
<style scoped>
.main_container
{
    position:relative;
    max-width:800px;
    margin:auto;
    display:block;
    height:500px;
}
button
{
    position:absolute;
    top:50%;
    background-color:#ccc;
    transform:translateY(-50%);
    transform:translateX(-50%);
    margin:auto;
    height:50px;
    border-radius:5px;
    border:2px solid transparent;
    text-transform:uppercase;
    font-family:Arial,sans-serif;
    padding:10px 45px;
    transition:0.1s;
}
button.downloadButton
{
    left:25%;
       transform:translateX(-25%);
}
button.proceedButton
{
    left:75%;
       transform:translateX(-75%);
}
button:hover{
    border-color:#000;
    transition:0.1s;
    background-color:lightgreen;
    color:#fff;
}
button[disabled]:hover
{
    background-color:#ccc;
    border-color:transparent;
    color:#2c3e50
}
</style>
