import React, { Component } from 'react'
import { View , ImageBackground , StyleSheet,Dimensions,Animated ,PanResponder,Image , Linking } from 'react-native'
import logo from '../../asserts/images/logo.jpeg'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

import { TouchableOpacity } from 'react-native-gesture-handler'

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class CardData extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             data:[],
             currentIndex: 0
        }
        this.PanResponder=""; 
    }

    componentDidMount(){
        console.log("Data" , this.props)
    }
    
    
    render() {
        return (  
          <View style={styles.container} > 
              <View style={styles.card} >
                  <Text style={styles.title} >{this.props["title"]}</Text>
                  <ImageBackground style={styles.image} source={{uri:this.props["urlToImage"]}} >
                      
                  </ImageBackground>
              </View>
                <View>
                <View style={styles.card} >
                    <Text style={styles.description}>{"      "}
                        {this.props["description"]}
                    </Text>

                    <Text style={styles.content}>{"      "}
                        *{this.props["content"]}*
                    </Text>

                    
                </View> 
                <View style={{margin:5 , marginTop:-5}} >
                    <Text numberOfLines={1} style={{color:"#a25600"}}>
                        Author : {this.props["author"]}
                    </Text>
                    <Text style={styles.click} onPress={()=>Linking.openURL(this.props["url"])} >
                        For more details click here !
                    </Text>
                </View>
              </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,
    //   backgroundColor:'black'
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "flex-start",
    //   width:SCREEN_WIDTH,
    //   height:SCREEN_HEIGHT
    },
    text: {
      color: "black",
      fontSize: 20,
      fontWeight: "bold"
    },
    card:{
        height:300, 
        margin:5
    //     width:SCREEN_WIDTH,
    //   height:SCREEN_HEIGHT
    },
    description:{
        fontSize:20,
        fontStyle:'italic',
        color: "black",
    },
    title:{
        fontWeight:"bold",
        fontSize:26,
        color: "black",
    },
    click:{
        color:'blue'
    },
    content:{
        fontSize:20,
        fontStyle:'italic',
        color: "green",
    },
  });

export class NoMoreCards extends React.Component {
    constructor(props) {
      super(props);
    }
   
    render() {
      return (
        <View style={styles.noMoreCards}>
          <Text>No more cards</Text>
        </View>
      )
    }
}
 