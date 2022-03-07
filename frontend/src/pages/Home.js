import {  Container, makeStyles } from '@material-ui/core'
import React from 'react'
import MediaCard from '../components/Card'


const useStyles = makeStyles((theme)=>({
Container:{
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
gap:"1rem",

}
}))

const Home = () => {
  const classes = useStyles()
  return (
    <Container className= {classes.Container}>
      <MediaCard />
    </Container>
  )
}

export default Home