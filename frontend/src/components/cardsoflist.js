import React, {useRef} from 'react';
import axios from "axios";
import Divider from '@material-ui/core/Divider';
import Cardstyle from './Cardstyle';

class CardsofList extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            cards : [],
            listId : this.props.listId,
            projectId : this.props.projectId
          }
        // this.fetchTasks = this.fetchTasks.bind(this)
    }
    
    async componentWillMount(){
        const listId = this.state.listId
        const projectId = this.state.projectId
        console.log("called for " + listId)
        try {
            const res = await fetch("http://127.0.0.1:8000/headup/project/" +projectId+"/lists/" + listId , {
              method : "GET",
            });
            const cards = await res.json();
            this.setState({
              cards :  cards
            });
          } catch (e) {
            console.log(e);
          }

    }
    renderItems = () => {
        const cards = this.state.cards
        
        return(
          <div style={{display:"flex", justifycontent: "space-evenly", flexDirection :"row", flexWrap:'wrap'}}>
            {cards.map((card) => (
            <>
         <div style={{margin: "20", display:"flex", padding:15}}>
         <Cardstyle title= {card.title}  content={card.description}/>
         <Divider/>
            </div>
            </>
                ))}
                
          </div>
        )
      };
  
      render(){
        return (
          <main className="content">
          <div >
        {this.renderItems()}
                
          </div>

        </main>
        )
      }
    
    //   return(
    //     {cards.map((card) => (
    //         <>
    //      <div style={{margin: "20", display:"flex", padding:15}}>
    //      <Cardstyle title= {card.title}  content={card.description}/>
    //      <Divider/>
    //    </div>
    //    </>
    //     ))}
    //   )
      
}
export default CardsofList;