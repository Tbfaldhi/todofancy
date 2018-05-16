const app = new Vue({
    el: "#app",
     data:{
       searchdata:{
         status:''
       },
      taskdata:{
        task:''
      },
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
          swal({
            title: "Yosh!",
            text: "Success login!",
            icon: "success",
          }); 
          localStorage.setItem('token', data.data.token)
          window.location.href = '/home.html'
        })
        .catch(err => {
          swal({
            title: "ugggggh!!",
            text: "login! failed,username or password wrong",
            icon: "warning",
          });

          console.log(err);
        })

      },
      logout:function(){

          localStorage.removeItem('token')
          window.location.href = './index.html'

       },
      update:function (task) {  

          axios.put('http://localhost:3000/updatetask',{task} )
          .then(res=>{
            this.fetchdata()           
          })
          .catch(err=>{
            console.log(err);
            
          }) 

      },
      deleted: function (data) {  

        axios.delete(`http://localhost:3000/deletetask/${data}`)
        .then(data=>{
          this.fetchdata()
        })
        .catch(err=>{
          console.log(err);
          
        })
      },
      fetchdata(){

        token = localStorage.getItem('token')
        let self = this   
        axios.get("http://localhost:3000/getlist",{headers: {token: token}})
        .then(function (data) {
          self.tasklist = data.data
        })
        .catch(err=>{
          console.log(err);          
        }) 
      },
      addtask(){
        token = localStorage.getItem('token')    
        axios.post('http://localhost:3000/addTask',{task:this.taskdata.task},{headers: {token: token}})
        this.fetchdata()
      },
    },
    created:function () {
      this.fetchdata()
    }  
  })