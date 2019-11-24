<template>
    <div class="main_container"><h3>Results for</h3>
    <h2> {{name}} </h2>
    <h4>{{email}}</h4>
    
        <p>{{results}}</p>
        <h1> {{message}}</h1>

    </div>

</template>
<script>
export default {
    name: 'results',
    computed : {
        results(){
            return this.$store.state.results
        },
        name(){
            return this.$store.state.name
        },
        email(){
            return this.$store.state.email
        },
        message(){
            let message = '';
            switch(this.results)  {
                case 0: 
                case 1:
                case 2:
                    message = "Severe"
                break;
                case 3:
                case 4:
                case 5:
                    message = "Moderate"
                break;
                case 6:
                case 7:
                case 8:
                    message = "Mild"
                break;
                case 9:
                case 10: 
                    message = "Normal"
                break;
            }
            return message;
        }
    }
}
</script>
<style scoped>
.main_container {
    color:#fff;
}
.p {
     color:#fff;
}
</style>