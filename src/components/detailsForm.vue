<template>
  <div>
        <form @submit=submitForm>
            <div class="form_element"> 
                <input type="text" name="fullname" v-model="name" :class="{red: name.length < 2}"/>
                <label @click.prevent :class="{filled: name.length>0}"> Full name</label> 
            </div>
            <div class="form_element">
                <input type="text" name="email" v-model="email"/>
                <label  @click.prevent :class="{filled: name.length>0}"> Email </label> 
            </div>
            <button type="submit">Next </button>
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
    }
},
methods: {
    submitForm() {
        this.$router.push({path: 'test'})
    }
}
}

</script>
<style scoped>
label {
    font-size:12px;
    position:absolute;
    top:50%;
    transform:translateY(-25%);
    left:0;
}
input, label {
    height:40px;
    transition:0.2s;
    padding-left:15px;
}
label{
    pointer-events: none;
    margin-top:3px;
}
.form_element {
    position:relative;
    display:inline-block;
}

.form_element input:focus + label, .filled
{
    transition:0.2s;
    top:5px;
    font-size:10px;
    background:#fff;
    padding:5px;
    margin-left:15px;
    border-radius:5px;
    margin-top:-3px;
}
.form_element + button
{
    height:46px;
    padding:0 10px;
    background:black;
    border:1px solid transparent;
    color:#fff;

}
</style>
