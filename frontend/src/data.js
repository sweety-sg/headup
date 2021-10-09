import React from 'react'
import axios from 'axios'
import { Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { Card } from '@mui/material';
import Cardstyle from './components/Cardstyle';
import MyCards from './components/mycards';

// import Divider from '@material-ui/core/Divider';

class Data extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cards : []
          }
        // this.fetchTasks = this.fetchTasks.bind(this)
    }
    // var projectId;
    async findproj(listID){
      // try {
      //     const res = await fetch('http://127.0.0.1:3000/headup/list/'+ listID+"/", {
      //       method : "GET",
      //     });
      //     const list = await res.json();
      //     console.log(list + "blh")
      //     return list.project_l;
          
      //   } catch (e) {
      //     console.log(e+"bro");

      //   }
        // axios
        //   .get('http://127.0.0.1:3000/headup/list/'+ listID+"/")
        //   .then((res) => {
        //   const list = res;
        //   console.log(list + "blh")
        //   return list.project_l;
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     console.log("no");
        //   });

    }
    async componentWillMount(){
      var headers = new Headers()
        headers = {
        //   "csrf_token" : '',
        //   "sessionid" : '',
        }
        try {
          const res = await fetch('http://127.0.0.1:3000/headup/user/cards', {
            method : "GET",
          });
          const cards = await res.json();
          console.log(cards)
          
          this.setState({
            cards :  cards
          });
        } catch (e) {
          console.log(e);
        }
        // this.fetchTasks()
    }
    renderItems = () => {
            const newItems = this.state.cards
            
            // return newItems.map(card => (
              
            //   <div>
            //     <Cardstyle title= {card.title} subtitle={card.list} content={card.description}/>
            //     <Divider/>
            //   </div>
                 
            // ));
            return(
              <div style={{display:"flex", justifycontent: "space-evenly", flexDirection :"row", flexWrap:'wrap'}}>
                {newItems.map((card) => (
                  
                     <div style={{margin: "20", display:"flex", padding:15}}>
                     {/* <Cardstyle title= {card.title} subtitle={card.list} content={card.description} type="card" status={card.status} id={card.id} comp={card} 
                     projectId={this.findproj(card.list)}
                     /> */}
                     <MyCards card={card}/>
                     <Divider/>
                   </div>
                    ))}
              </div>
            )
          };
          
      
          render(){
            return (
              <main className="content">
              <div >
                <div>
                  <div>
                    <ul>
                      {this.renderItems()}
                    </ul>
                  </div>
                </div>
              </div>
            </main>
            )
          }
}


export default Data;