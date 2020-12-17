<template>
    <b-container>
        <b-row align-h="center">
            <b-col lg="8">
                <b-card class="identification-box">
                    <b-card-title align="center" class="mb-5">Mon profil</b-card-title>
                    <b-col offset-lg="2" lg="8">
                        <div align="center">
                            <div class="base-image-input" v-b-tooltip.hover title="Modifier la photo de profil" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                                <span v-if="!imageData" class="placeholder">Insérer une image</span>
                                <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
                            </div>
                        </div>             
                        <label for="pseudo">Pseudo</label>
                        <b-form-input id="input-1" class="mb-3" v-model="user.pseudo" placeholder="Mon pseudo" >
                        </b-form-input>                    
                        
                        <label for="email-adress" >Adresse email</label>
                        <b-form-input id="input-2" class="mb-3" v-model="user.email" type="email" placeholder="Mon adresse email">
                        </b-form-input>
                        
                        
                        <b-button v-show="displayModifyPassword" @click="switchDisplayModifyPassword" pill size="sm" class="modify">Modifier mon mot de passe</b-button>
                        <label for="password" >Mot de passe</label><br>
                        <b-form-input v-show="!displayModifyPassword" id="input-3" class="mb-5" v-model="password" type="password" placeholder="Tapez votre nouveau mot de passe">
                            
                        </b-form-input>
                        <div align="center">
                            <b-button pill @click="modifyUser">Modifier</b-button>
                            <b-button pill @click="modifyUser">Annuler</b-button>
                            <b-button pill size="sm" class="ml-3 deleteButton " @click="deleteUser">Supprimer mon profil</b-button>
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
            displayModifyPassword: true,
            imageData: "",
            password: '',
            user: {},
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
        },
    },
    methods: {
    chooseImage () {
      this.$refs.fileInput.click()
    },
    onSelectFile () {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader
        reader.onload = event => {
          this.imageData = event.target.result
        }
        reader.readAsDataURL(files[0])
        this.file = this.$refs.fileInput.files[0];
      }
    },
        handleFileUpload(){
            this.file = this.$refs.fileInput.files[0];
            },
        switchDisplayProfile() {
            let emitDisplayProfile = !this.displayProfile;
            this.$emit('display-profile', emitDisplayProfile)
        },
        switchDisplayModifyPassword() {
            this.displayModifyPassword = !this.displayModifyPassword
        },
        getUser() {
            this.$http.get(url + 'users/' + this.userId, this.headers)
            .then(res => { this.user = res.data; this.imageData = res.data.profilePicture })
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
                this.$parent.getPosts();
                this.switchDisplayProfile();
                this.$refs.fileInput.value = '' })
            .catch(err => { console.log(err) })
        },
        deleteUser() { 
            confirm("Attention. Toutes vos données seront supprimées. Cette action est irréversible.")
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
        background-color: transparent;
        border: solid 1px #fd2d01;
        color: black;
    }
    .modify {
        background-color: white;
        border: none;
        color: black;
    }
     .base-image-input {
 
  display: block;
  width: 10em;
  height: 10em;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;
}
.base-image-input:hover {
  opacity: 0.5;
}
  .placeholder {
  background: #ffd7d7;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 1em;
  text-align: center;
  border: solid 1px #fd2d01;
  border-radius: 50%;
}
.placeholder:hover {
  background: #ffb3b3;
}
.file-input {
  display: none;
}
</style>