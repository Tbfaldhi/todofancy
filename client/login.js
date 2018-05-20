
const app = new Vue({
    el:'#app',
    data:{
        loginData:{
            username:'',
            password: '',     
        },
        registerData: {
            username: '',
            email: '',
            password: '',
          },
    },
    methods:{
        register: function (event) {
        
            event.preventDefault();
            axios.post('http://localhost:3000/users/register', this.registerData)
            .then((response) => {
                this.registerData.username= '';
                this.registerData.email= '';
                this.registerData.password= '';
              })
            .catch((error) => {
              console.log(error);
            });
      
          },
          login: function (event) {
    
            event.preventDefault()
            axios.post('http://localhost:3000/users/login', this.loginData)
            .then(response => {
                
              localStorage.setItem('token', response.data.token)
              window.location.href = '/home.html'
              
            })
            .catch(err => {
              swal({
                title: "Sorry!!",
                text: "login! failed,username or password wrong",
                icon: "warning",
              });
              throw err
              console.log(err.response);
              //response.status(500).json(user)

            })
    
          },
    }
        
})