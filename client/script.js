const app = new Vue({
    el: "#app",
     data:{
      loginData:{
        username:'',
        password: ''
      },
      registerData: {
        username: '',
        email: '',
        password: ''
      },
      toDoLists:[],
      },
    methods: {
      register: function (event) {
        event.preventDefault();
        axios.post('http://localhost:3000/users/register', this.registerData)
        .then((response) => {
          swal({
            title: "Yosh!",
            text: "Successfully registered!",
            icon: "success",
          });
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
        .then(data => {
          console.log(data);
          
          localStorage.setItem('token', data.data.token)
          window.location.href = 'index.html'
        })
        .catch(err => {
          console.log(err);
        })
      }
    },  
    logout:function(){
      localStorage.removeItem('token')
      window.location.href= 'login.html'
    }




  })