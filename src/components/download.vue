

<template>
<div class="main_container">
    <button @click="downloadFiles" class="downloadButton"> Download Files </button>
    <downloadBar v-show="downloadPercent > 0" :progress={downloadPercent}></downloadBar>
    <!--I initially implemented the form in a separate page,
     but after reading through the assessment description I realised 
     that you might want it on the same page, luckily javascript frameworks 
     are very modular. So I could just comment out the button. No harm no foul :)
     
     <button @click="proceedToDetails" :disabled="this.downloaded != 5" class="proceedButton"> Next </button>  --> 
    <detailsForm v-if="this.downloadPercent == 100" > </detailsForm>
    
    </div>
</template>
<script>

import downloadBar from './downloadBar';
import detailsForm from './detailsForm';

import axios from 'axios';

export default  {
    name : "download",
    data() {
    return {
  
        urls : {
            '1'  : 'audio/1kHz_44100Hz_16bit_05sec.wav',
            '10' : 'audio/10kHz_44100Hz_16bit_05sec.wav',
            '100': 'audio/100Hz_44100Hz_16bit_05sec.wav',
            '250': 'audio/250Hz_44100Hz_16bit_05sec.wav',
            '440': 'audio/440Hz_44100Hz_16bit_05sec.wav',
        },
        totalFiles : 5,
        downloaded : 0,
        downloadPercent: 0,
        showDownload : false,
    }
    },
    methods : {
        downloadFiles() {
            this.displayDownload()
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
        },
        displayDownload() {
            this.showDownload = true;
        }
    },
    components:{
        downloadBar,
        detailsForm
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

    background-color:#333;
    border-radius:5px;
}
button
{
    position:static;
    margin-bottom:20px;
    margin-top:40px;
    top:50%;
    background-color:#ccc;
    /*transform:translateY(-50%);
    transform:translateX(-50%);*/
    /*margin:auto;*/
    height:50px;
    border-radius:5px;
    border:2px solid transparent;
    text-transform:uppercase;
    font-family:Arial,sans-serif;
    padding:10px 45px;
    transition:0.1s;
    display:inline-block;
    width:90%;
    font-family:"Source Sans Pro", Arial, Helvetica, sans-serif;
    font-weight:600;
    font-size:18px;
}
button.downloadButton
{
    left:25%;
       /*transform:translateX(-25%);*/
}
button.proceedButton
{
    left:75%;
      /* transform:translateX(-75%);*/
}
button:hover{
    border-color:#666;
    transition:0.1s;
    background-color:#02fe9b;
    color:#000;
}
button[disabled]:hover
{
    background-color:#ccc;
    border-color:transparent;
    color:#2c3e50
}

</style>
