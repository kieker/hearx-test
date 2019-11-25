<template>
    <div class="main_container"> 
        <div class="layout_define">
            <div class="details">
                <h2>Results for</h2>
                <h2> {{name}} </h2>
                <h4>{{email}}</h4>
            </div>
            <div class="result">  
                <p>{{results}}</p>
               <h3> {{message}}</h3>
            </div>
            
        </div>
        <router-link class="link" to="/"> Take the test again</router-link>
    </div>
</template>
<script>
export default {
    name: 'results',
    computed : {
        //get the variables from the store
        results(){
            return this.$store.state.results
        },
        name(){
            return this.$store.state.name
        },
        email(){
            return this.$store.state.email
        },
        //Set message according to the value in results
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
    padding:50px;

  font-family:"Source Sans Pro", Arial, Helvetica, sans-serif;
}
.p {
    color:#fff;
}
.result{
  width:50%;
  border:1px dashed #02fe9b;
  padding:40px;
  align-self:stretch;
    
}
.result p {
    font-size:38px;
    color:#02fe9b;
    font-family:"Source Sans Pro", Arial, Helvetica, sans-serif;
}
.details{
   width:50%;
}
.layout_define {
  display:flex;
}
.result h3
{
    color:#80deea;
}
a {
    color:#fff;
    text-decoration: none;
    margin-top:50px;
    display: block;
    transition:0.3s;
}
a:hover {
    color:#02fe9b;
    text-decoration:underline;
    transition:0.3s;
}
@media all and (max-width:800px){
    .result,.details {
        width:100%; display:block;
        }

    .layout_define {
        display: block;
    }
}
</style>