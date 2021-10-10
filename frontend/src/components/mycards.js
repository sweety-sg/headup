import React from 'react'
import axios from 'axios'
import { Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { Card } from '@mui/material';
import Cardstyle from './Cardstyle';

export default function MyCards(props){
    const card = props.card;
    const listID= card.list;
    const [list, setList] = React.useState([]);
    
    React.useEffect(() => {
        axios
        .get("http://127.0.0.1:3000/headup/list/"+ listID+"/")
        .then((res) => {
        console.log(res.data);
        setList(res.data);
        console.log("yes");
        })
        .catch((err) => {
        console.log(err);
        console.log("no");
        });
    },[]);

    return(
        <Cardstyle title= {card.title} subtitle={card.list} content={card.description} type="card" status={card.status} id={card.id} comp={card} 
                     projectId={list.project} chips={card.asignees}
                     />
    )
}