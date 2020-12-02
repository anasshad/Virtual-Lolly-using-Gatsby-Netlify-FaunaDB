import React, { useEffect } from "react";
import gql from 'graphql-tag'
import {useQuery} from '@apollo/client'

//components
import Lolly from "../components/lolly"

//styling
import './styles.css'

const GET_LOLLY_BY_LINK = gql`
query($link: String!){
  lollyByLink(link: $link){
    cl1
    cl2
    cl3
    msg
    from
    to
  }
}
`


const LollyTemplate = ({pageContext}) => {
  const { loading, error, data } = useQuery(GET_LOLLY_BY_LINK, {
    variables: {
      link: pageContext.link
    }
  });

  if(loading){
    return <div>Loading</div>
  }

  if(error){
    console.log(error)
    return <div>Error</div>
  }

  console.log(data.lollyByLink)
  const {cl1, cl2, cl3, to, from, msg} = data.lollyByLink
  
  return (
    <div className="App">
      <h2>Virtual Lolly</h2>
      <div className="main-container">
        <div className="lolly-container">
            <Lolly top={cl1} middle={cl2} bottom={cl3} />
        </div>
        <div className="message-container">
          <p className="to">{`Dear ${to},`}</p>
          <p className="msg">{msg}</p>
          <p>From, </p>
          <p className="from">{from}</p>
        </div>
      </div>
    </div>
  )
}

  


export default LollyTemplate
