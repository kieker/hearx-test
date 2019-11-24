<template>
    <div class="downloadBar">
        <div class="filled" :style="{'width' : this.progress.downloadPercent + '%'}"></div>
        <span class="percentage">{{progress.downloadPercent}}%</span>
    </div>
</template>
<script>
export default {
    name: 'downloadBar',
    props : [
        'progress',
    ]
}
</script>
<style>
.downloadBar
{
    width:90%;
    display:inline-block;
    height:20px;
    border:1px solid transparent;
    background-color:transparent;
    border-radius:5px;
    border:3px solid #02dd87;
    bottom:5em;
    transform:translateY(100%);
    margin:auto;
    left:0;
    right:0;

}
.downloadBar .filled{
    transition: 1s;
    
    background-color:#02fe9b;
    display:block;
    height:20px;
    /* border-radius:5px; */
    overflow:hidden;
}
.percentage{
    z-index:2;
    color:#000;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
}
</style>