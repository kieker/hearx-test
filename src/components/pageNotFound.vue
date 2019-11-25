<template>
    <div class="main_container">
        <h1> 404 - Page Not Found </h1>
        <h3> Did you discover this by accident?</h3>
         <router-link class="link" to="/"> Click here to go back </router-link>
        </div>
</template>

<script>
export default {
    name:"pageNotFound",

}
</script>
<style scoped>
h1 {
    color:#80deea;
    font-size:50px;
    margin-top:0;
}
h3 {
    color:#02fe9b;
}
a{
    color:#fff;
}
.main_container {
    padding:30px;
    padding-bottom:60px;
}
.link {
    margin-bottom:50px;
}
</style>