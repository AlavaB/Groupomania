<template>
    <b-container>
        <b-row align-h="center">
            <b-col lg="8">
                <b-card class="identification-box">
                    <b-card-title align="center" class="mb-5">Mon profil</b-card-title>
                    <b-col offset-lg="2" lg="8">
                        <div align="center">
                            <label for="profile-picture">Photo de profil</label>
                            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                            <b-avatar class="mb-3" v-show="!displayImage" v-model="user.imageProfile" :src="require('../assets/images/avatar.png')" size="5rem"></b-avatar><br> 
                        </div>
                                                 
                        <label for="pseudo" >Pseudo</label>
                        <b-form-input id="input-1" class="mb-3" v-model="user.pseudo" placeholder="Mon pseudo" >
                        </b-form-input>                    
                        
                        <label for="email-adress" >Adresse email</label>
                        <b-form-input id="input-2" class="mb-3" v-model="user.email" type="email" placeholder="Mon adresse email">
                        </b-form-input>
                        
                        <label for="password" >Mot de passe</label>
                        <b-form-input id="input-3" class="mb-5" v-model="password" type="password" placeholder="Tapez votre nouveau mot de passe">
                            
                        </b-form-input>
                        <div align="center">
                            <b-button pill @click="modifyUser">Modifier</b-button>
                            <b-button pill class="ml-3 deleteButton " @click="deleteUser">Supprimer</b-button>
                        </div>
                        
                    </b-col>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>
 
<script>
import { url } from '../main'

export default {
    name: "Profile",
    data() {
        return {
            password: '',
            user: {},
            displayImage: true,
            uri: 'users/' + this.userId,
            file: "",
            headers: {
                headers:  {
                Authorization: this.token,
                userId: this.userId
                }
            }
        }    
    },
    props: {
        userId: {
            type: String
        },
        displayProfile: {
            type: Boolean
        },
        token: {
            type: String
        }
    },
    created(){
        this.getUser()
    },
    computed: {
        body() {
            if (this.password === '' || this.password === null) {
                return { 
                    pseudo: this.user.pseudo,
                    email: this.user.email,
                } 
            } else {
                return {
                    pseudo: this.user.pseudo,
                    email: this.user.email,
                    password: this.password

                }
            }
        }
    },
    methods: {
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
            },
        switchDisplayProfile() {
            this.displayProfile = !this.displayProfile;
            this.$emit('display-profile', this.displayProfile)
        },
        getUser() {
            this.$http.get(url + 'users/' + this.userId, this.headers)
            .then(res => { this.user = res.data })
            .catch(err => { console.log(err) })
        },
        modifyUser() { 
            let formData = new FormData();
            formData.append('image', this.file);
            formData.append('pseudo', this.body.pseudo);
            formData.append('email', this.body.email);
            formData.append('user_id', this.userId);
            if(this.body.password) {
            formData.append('password', this.body.password);}
            this.$http.put(url + this.uri, formData, this.headers)
            .then(() => { 
                this.switchDisplayProfile();
                this.$refs.file.value = '' })
            .catch(err => { console.log(err) })
        },
        deleteUser() { 
            this.$http.delete(url + this.uri, this.headers)
            .then(() => { this.logout() })
            .catch(err => { console.log(err) })
        },
        logout() {
            localStorage.clear();
            this.$router.push('/login');
        }
    }
};


</script>

<style scoped>
    .identification-box {
        background-color: #ffd7d7;
    }

    .deleteButton {
        background-color:#fe5634;
        border: none;
    }
</style>