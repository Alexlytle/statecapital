const Search = {
        data(){
          return{
            showOverLay:false,
            open_or_close:'Closed',
            // textsearch:'',
            showspinner:false,
            typingtime:'',
            previous:'',
            results:'',
            states:[],
        
          }
        },
         mounted(){
                                                    fetch('https://gist.githubusercontent.com/bradtraversy/20dee7787486d10db3bd1f55fae5fdf4/raw/2c06c44dcea55ecbb6fbf20edfd240ec6373b688/state_capitals.json')
           .then(res=>res.json())
           .then(data=>{
                     this.states = data
                     console.log(this.states)
                })
      
          },
          methods:{
           openOverLay(e){
             
             let timer = new Promise((res,reject)=>{
                        res('success')
                        reject(new Error("Error!"));
                })
             timer.then(()=>{
                  this.showOverLay = true   
                })
                .then(()=>{
                   document.querySelector("#search-term").focus()  
                })
         
                

              
            },
            closeOverLay(){
               this.showOverLay = false
            },
            handleInput(e){

              if( e.target.value != this.previous ){
                      clearTimeout(this.typingtimer)
                  if(e.target.value !== ''){
                      if(this.showspinner == false){
                          this.showspinner = true
                          this.results  = ''
                        }
                      this.typingtimer =  setTimeout(()=>{
                        this.showspinner = false
                        this.searchStates(e.target.value)
                      },500)
                  }else{
                    console.log('has value')
                    this.showspinner = false
                    this.results  = ''
                  }
              }
              this.previous = e.target.value

              // console.log()
            },
         searchStates(searchText){
              this.results = this.states.filter(state=>{
                return state.name.toLowerCase().includes(searchText.toLowerCase()) || state.lat.toLowerCase().includes(searchText.toLowerCase()) 
              })
                // console.log(test)
               
            }

          },
 
}
Vue.createApp(Search).mount('#app')