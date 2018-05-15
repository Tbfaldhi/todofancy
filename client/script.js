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
      tasklist:[]
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
      },
      logout:function(){
        localStorage.removeItem('token')
        window.location.href = '/login.html'
      },
      update:function (task) {  
      console.log(task);
        
      axios.put('http://localhost:3000/updatetask',{task} )
      .then(res=>{
        console.log(res);
        //window.location.href = 'index.html'
        // this.$set()
        // let index = this.tasklist.indexOf(res.data[0])
        // this.tasklist.splice(index, 1, res.data[0])
        this.fetchdata()    
        
      })
      .catch(err=>{
        console.log(err);
        
      }) 

      },
      deleted: function () {  

      },
      fetchdata(){
        token = localStorage.getItem('token')
        let self = this
        console.log(token);    
        axios.get("http://localhost:3000/getlist",{headers: {token: token}})
        .then(function (data) {
          console.log(data);
          self.tasklist = data.data
        })
        .catch(err=>{S
          console.log(err);
          
        }) 
      }
    },
    created:function () {
      this.fetchdata()
    }  
    




  })