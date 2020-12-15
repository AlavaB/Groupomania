<template>
    <b-container>
        <Header />
        <b-row align-h="center">
            <b-col lg="8">
                <b-card class="identification-box">
                    <b-card-title align="center" class="mb-4">Mon profil</b-card-title>
                    <b-col offset-lg="2" lg="8">
                            <label for="profile-picture" class="mb-0">Photo de profil</label>
                            <b-form-input id="input-1" class="mb-3" v-model="user.imageProfile" placeholder="Mon image de profil"></b-form-input>
                            <label for="pseudo" class="mb-0">Pseudo</label>
                            <b-form-input id="input-2" class="mb-3" v-model="user.pseudo" placeholder="Mon pseudo" >
                                </b-form-input>                    
                            <label for="email-adress" class="mb-0">Adresse email</label>
                            <b-form-input id="input-3" class="mb-3" v-model="user.email" type="email" placeholder="Mon adresse email">
                                </b-form-input>
                            <label for="password" class="mb-0">Mot de passe</label>
                            <b-form-input id="input-4" class="mb-3" v-model="form.password" type="password" placeholder="Mon mot de passe">
                                </b-form-input>
                            <b-button @click="httpModifyUser">Modifier</b-button>
                            <b-button @click="httpModifyUser">Supprimer</b-button>

                    </b-col>
        </b-card>
      
            </b-col>
        </b-row>
    </b-container>

</template>
 
<script>
import Header from '../components/Header'

export default {
    name: "Profile",
    components: {
        Header,
    },
    data() {
        return {
            form: {
                email: '',
                pseudo: '',
                password: '',
                imageProfile: ''
                }, 
            user: {},
            token: '',
            userId: ''
        }
    },
    created(){
        this.httpGetUser()
    },
    methods: {
        httpGetUser() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser) {
            this.token = currentUser.token
            this.userId = currentUser.userId
            const headers = {Authorization: this.token, userId: this.userId}
            this.$http.get(`http://localhost:3000/api/users/${currentUser.userId}`, { headers })
                .then(res => { this.user = res.data }) 
                .catch(err => { 
                    this.error = {
                        Title: "Un problème est survenu",
                        Message: err
                    }
                })
            } 
        },
        httpModifyUser() {
        const headers = {Authorization: this.token, userId: this.userId}
        this.$http.put(`http://localhost:3000/api/users/${this.post.id}`, { headers })
            .then(() => { this.$parent.httpGetUsers() })
            .catch(err => {      
                this.error = {
                Title: "Un problème est survenu",
                Message: err
            }})
        },
    }

};
</script>

<style scoped>
  .identification-box {
        background-color: #ffd7d7;
    }
</style>