
<!-- 
I would spend more time here to provide better feedback to the user. 
At the moment, the downloadbar doesn't fill when there is an error with the files. 
If this is the case I would perhaps tell the user that there is a problem with the download, and to try again later. 

Also, the download progress bar starts when the user clicks on the link, not when they choose where to save this. 
So there is a bit of a disconnect with this. 

Perhaps building a preloader, or splash screen would be more visually appealing. But nothing that takes longer than 3s to load.
-->
<template>

<div class="main_container">
    <!-- <div class="preloader"><img src="@/assets/ear.png"/></div> -->
    <h2>To get started, press the button to download the necessary files for the test.</h2>
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
            '1'  : 'audio/1KHz_44100Hz_16bit_05sec.wav',
            '10' : 'audio/10kHz_44100Hz_16bit_05sec.wav',
            '100': 'audio/100Hz_44100Hz_16bit_05sec.wav',
            '250': 'audio/250Hz_44100Hz_16bit_05sec.wav',
            '440': 'audio/440Hz_44100Hz_16bit_05sec.wav',
        },
        totalFiles : 5,
        downloaded : 0,
        downloadPercent: 0,
        showDownload : false,
        preloadDone : false,
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
                    data.downloaded++;
                    data.downloadPercent = (data.downloaded / data.totalFiles)  * 100;
                    if (data.downloadPercent >100) {
                        data.downloadPercent = 0
                    }

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
<style >
/*
 * I've included some base styles here, which will used throughout the app, which is why this isn't scoped. 
 * Perhaps this would have been better suited for the overall app and not the component?
 *
 */
 
.main_container
{
    position:relative;
    max-width:800px;
    margin:auto;
    display:block;
    
    background-color:#383838;
    border-radius:5px;
    padding-bottom:30px;
    /* position:absolute;
    top:0;
    bottom:0;
    right:0;
    left:0; */
     /* max-height:400px;  */
    height:auto;
}
button
{
    position:static;
    margin-bottom:20px;
    margin-top:40px;
    top:50%;
    background-color:#80deea;
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
    box-shadow: 0px 7px #74c8d3; 
}
button.downloadButton
{
    left:25%;
   
}
button.proceedButton
{
    left:75%;

}
button:hover{
    transition:0.3s;
    color:#000;
    box-shadow: 0px 5px #74c8d3; 
    transform:translateY(1px);
    padding-bottom:9px;
    background-color:#02fe9b;
    box-shadow: 0px 7px #02dd87; 
}
button[disabled]:hover
{
    background-color:#ccc;
    border-color:transparent;
    color:#2c3e50
}
button:active {
    box-shadow: 0px 3px #74c8d3; 
    outline:0;
}
.preloader {
    position:static;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index:-1;
    background:#666;
    display:block;
    -webkit-animation-name: preload;
    -webkit-animation-duration: 4s; 
    animation-name: preload;
    animation-duration: 2s;
    opacity:0;
    
}
@keyframes preload {
    from {opacity:1;z-index:10}
    to {opacity:0;z-index:-1}
}

h2 {
    text-align:center;
    color:#fff;
    max-width:80%;
    margin:auto;
    padding-top:40px;
    font-family:"Source Sans Pro", Arial, Helvetica, sans-serif;
}

</style>
