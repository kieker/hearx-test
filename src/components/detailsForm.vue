<!-- 
I would do stricter validation here. For the moment if you end the email on a . after @, the code will accept it.
I originally added this as an extra page, you can still view this at /details. I've also included a 404 page. 
-->
<template>
  <div class="main_container">
      <p>Please fill in the following details:</p>
        <form @submit.prevent="validateForm">
            <div class="form_element"> 
                <input 
                    type="text" 
                    name="fullname" 
                    v-model="name" 
                    :class="{red: name.length < 2}" 
                    v-on:keydown.enter.prevent
                />
                <label @click.prevent :class="{filled: name.length>0}"> Full name</label> 
                <div class="form_error" v-if="this.nameError && submitTried">Please enter a name.</div>
            </div>
            
            <div class="form_element">
                <input 
                    type="text" 
                    name="email" 
                    v-model="email"
                    v-on:keydown.enter.prevent
                    
                />
                <label  @click.prevent :class="{filled: email.length>0}"> Email </label> 
                <div class="form_error" v-if="this.emailError && submitTried">Please enter a valid email</div>
            </div>
         
            <button type="submit" @click="submitForm" :disabled="errors && submitTried">Next </button>

        </form>
    </div>
</template>
<script>
export default {
name : "detailsForm",
data() {
    return {
    email : "",
    name: "",
    submitTried : false,
    errors: true,
    nameError : true,
    emailError : true,
    }
},
methods: {

    /* *
     * I could have used an existing library like vuelidate to do validation here, 
     * but it is simple enough to implement something like this, and  
     * I was already using a few external libraries for other things, 
     * so here we go:
     * */

        validateName() {
            if (this.name.length > 1)
            {
                this.nameError = false;
            }
            else 
            {
                this.nameError = true;
            }
            return this.nameError
        },
        validateEmail() {
            /* this validates the email by checking:
            * 1. if the email is longer than 4, so that users don't fill in something like a@.z, which would be valid according to the other rules
            * 2. if the email contains an @ symbol
            * 3. if the email contains a . after the @ symbol
            * */
            if (  
                    this.email.length > 4 
                &&  (this.email.indexOf(".") > -1
                &&  ( (this.email.indexOf("@") > -1 )
                &&  (this.email.indexOf(".") > (this.email.indexOf("@") ) )))
                ) 
            {
                this.emailError = false;
            }
            else
            {
                this.emailError = true;
            }
            return this.emailError
        },
        validateForm() {
            
            let no_name_error = this.validateName()
            let no_email_error = this.validateEmail()
            if (no_name_error != true && no_email_error != true) 
            {
                this.errors = false
            }      

        },
        submitForm() {
            this.submitTried = true
            this.validateForm()
            if (this.errors != true)
            {
                this.$store.dispatch('saveEmail', this.email)
                this.$store.dispatch('saveName', this.name)
                this.$router.push({path: 'test'})
            }
           


        }
    },
    watch : {
        name() {
             if (this.submitTried != false)
             {
               this.validateForm()
             }
        },
        email() {
            if (this.submitTried != false)
            {
               this.validateForm()
            }
        }
        
    }
}

</script>
<style scoped>
.form_element {
    position:relative;
    display:block;
      
    width:90%;
    margin:auto;
}
input, label {
    height:40px;
    transition:0.2s;
    padding-left:25px;
    font-family:'Source Sans Pro', Arial, Helvetica, sans-serif;

}
input {
    border-radius:5px;
    margin-bottom:20px;
    width: 90%;
    border:none;
    font-family:'Source Sans Pro', Arial, Helvetica, sans-serif;
    letter-spacing:1px
}
label {
    font-size:12px;
    position:absolute;
    top:37%;
    transform:translateY(-25%);
    left:0;
       pointer-events: none;
    left:50px;
    top:18px;
    background-color:#fff;
    height:auto;
    padding:0;
}
.form_element input:focus, .form_element input:hover {
    outline:none;
    /*box-shadow:0px 10px #000;*/
    transition:0.5s;
}

.form_element input:focus + label, .filled
{
    transition:0.2s;
    top:-3px;
    font-size:12px;
    background:#fff;
    padding:5px;
    border-radius:5px;
    margin-top:-3px;
    height:10px;
    margin-bottom:0;
}

.form_error
{
    text-align:left;
    max-width:90%;
    margin:20px auto;
    font-size:12px;
    color:#f00;
    margin-top:0;
    font-style:italic;
    margin-bottom:40px;
    background-color:rgba(0,0,0,0.2);
    display:inline-block;
    margin-left:0;
    padding:10px;
    border-radius:5px;


}
.main_container
{
    margin-top:40px;
    max-width:800px;
    margin:auto;
    border-radius:5px;
    background-color:#333;
    padding:50px 0;
    margin-top:40px;

}
p {
    font-family:'Source Sans Pro', Arial, Helvetica, sans-serif;
    color:#fff;
}
</style>
