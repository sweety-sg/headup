import React from 'react'
import axios from 'axios'
import { Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';

class Data extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cards : []
          }
        // this.fetchTasks = this.fetchTasks.bind(this)
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
            return newItems.map(card => (
              <div>
                <ListItem><li 
                key={card.id}
              >
                <span 
                  >
                    {card.title}
                  </span>
                  <p>{card.description}</p>
              </li></ListItem>
              <Divider />
              </div>
              
              
            ));
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