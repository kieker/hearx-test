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
    width:100%;
    display:block;
    height:40px;
    border:1px solid #000;
    background-color:transparent;
    border-radius:5px;
    position:absolute;
    bottom:100%;
    transform:translateY(100%);
    margin-top:160px;
}
.downloadBar .filled{
    transition: 1s;

    background-color:lightgreen;
    display:block;
    height:40px;
    border-radius:5px;
    overflow:hidden;
}

</style>