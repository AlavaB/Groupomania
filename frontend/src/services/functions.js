export function httpDeletePost() {
    const headers = { Authorization: this.token, userId: this.userId }
    this.$http.delete(`http://localhost:3000/api/posts/${this.post.id}`, { headers })
        /*.then(this.$parent.httpGetPosts())
        .catch(err => {
            this.error = {
                Title: "Un problème est survenu",
                Message: err
            }
        })*/
}