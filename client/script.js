const app = new Vue({
    el: "#app",
    condition(){
      return{
        status:true
      }
    },
     data:{
       searchdata:{
         search:''
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
          console.log(data); 
          localStorage.setItem('token', data.data.token)
          window.location.href = '/'
        })
        .catch(err => {
          console.log(err);
        })
      },
      logout:function(){
          localStorage.removeItem('token')
          window.location.href = './login.html'
       },
      update:function (task) {  
      console.log(task);
        
      axios.put('http://localhost:3000/updatetask',{task} )
      .then(res=>{
        console.log(res);
        this.fetchdata()    
        
      })
      .catch(err=>{
        console.log(err);
        
      }) 

      },
      deleted: function (data) {  
        console.log(data);     
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
        console.log(token);    
        axios.get("http://localhost:3000/getlist",{headers: {token: token}})
        .then(function (data) {
          console.log(data);
          self.tasklist = data.data
        })
        .catch(err=>{
          console.log(err);
          
        }) 
      },
      addtask(){
        console.log(this.taskdata.task);
        token = localStorage.getItem('token')    
        axios.post('http://localhost:3000/addTask',{task:this.taskdata.task},{headers: {token: token}})
        this.fetchdata()
      },
      search(){
        console.log('ssssssssssss');
        let self = this
        //let task = this.searchdata.search
        //window.rel
        axios.get("http://localhost:3000/search",{task:this.searchdata.search})
        .then(data=>{
          console.log(data);
          self.tasklist = data.data
        })
        .catch(err=>{
          res.send(err)
        })
      }
    },
    created:function () {
      this.fetchdata()
    }  
  })