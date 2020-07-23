import React, { Component } from 'react'
import { Text, View , StyleSheet , ImageBackground , Image , Alert} from 'react-native'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import logo from '../../asserts/images/logo.jpeg'
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
    CardData,
    NoMoreCards
} from '../../components/index'
import {
    getNews
} from '../../actions/getFeed'
import SwipeCards from 'react-native-swipe-cards';
import AsyncStorage from '@react-native-community/async-storage';
import {
  clearData,
  getData,
  storeData
} from '../../actions/userData'

export default class Feed extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',
            backgroundColor: '#fff',
            data:[]
        }
    }
 
    logOut = () =>{
      Alert.alert(
        'Logout',
        'Do you want to logout',
        [
          {
            text: 'Ask me later',
            onPress: () => console.log('Ask me later pressed')
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: async() => {
            await this.clearData();
            this.props.navigation.navigate('FeedMe') }}
        ],
        { cancelable: false }
      ); 
    }

   async componentDidMount(){

        const user  = await this.getData()
        console.log("UserInfo" , user)
        await getNews().then(async(res)=>{
            // console.log("Data"  ,await res)
            this.setState({data:res["articles"]})
        }) 
        console.log("Data" , this.props)
        this.props.navigation.setOptions({
          headerTitleAlign:'center',
          headerLeft:null,
          headerRight:()=>
          <View>
            <TouchableOpacity onPress={this.logOut} >
              <Image style={{width:50,height:50,borderRadius:10}} source={require('../../asserts/images/logo.jpeg')} />
            </TouchableOpacity>
          </View>
        })
    } 

    handleYup (card) {
        console.log("yup")
      }
     
      handleNope (card) {
        console.log("nope")
      }
     
      cardRemoved (index) {
        console.log(`The index is ${index}`);
     
        let CARD_REFRESH_LIMIT = 3
     
        if (this.state.data.length - index <= CARD_REFRESH_LIMIT + 1) {
          console.log(`There are only ${this.state.data.length - index - 1} cards left.`);
     
          if (!this.state.outOfCards) {
            console.log(`Adding ${cards2.length} more cards`)
     
            this.setState({
              cards: this.state.data.concat(cards2),
              outOfCards: true
            })
          }
        }
      }
    
    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };

        return (
            
            <SwipeCards
                cards={this.state.data}
                loop={false}
        
                renderCard={(cardData) =><CardData {...cardData} />}
                renderNoMoreCards={() => <NoMoreCards />}
                showYup={true}
                showNope={true}
                yupText="Liked"
                nopeText="Don't show me again"
                handleYup={this.handleYup}
                handleNope={this.handleNope}
                cardRemoved={this.cardRemoved.bind(this)}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text: {
      color: "grey",
      fontSize: 30,
      fontWeight: "bold"
    }
  });
