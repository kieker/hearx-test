<template>
    <div class="downloadBar">
        <div class="filled" :style="{'width' : this.progress.downloadPercent + '%'}"></div>
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
    border:1px solid #ccc;
    background-color:transparent;
    border-radius:5px;

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
    border-radius:5px;
    overflow:hidden;
}

</style>