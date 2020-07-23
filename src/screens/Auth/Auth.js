
import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, Image } from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  clearData,
  getData,
  storeData
} from '../../actions/userData'

export default class Auth extends Component {
  constructor() {
    super();
    //Setting the state for the data after login
    this.state = {
      user_name: '',
      token: '',
      profile_pic: '',
      isLoggedin:false,
      data:[]
    };
  }

  async componentDidMount(){
   try{
     GoogleSignin.configure({

      scopes: ['https://www.googleapis.com/auth/drive.readonly'], 
      webClientId:'183137475510-c2cbfpo0kvqjtvf7pn49itnqm56av82n.apps.googleusercontent.com', 
      offlineAccess: true, 
      hostedDomain: '', 
      loginHint: '', 
      forceConsentPrompt: true, 
      accountName: '',
      iosClientId: 'XXXXXX-krv1hjXXXXXXp51pisuc1104q5XXXXXXe.apps.googleusercontent.com'
      });
    
    console.log("Success") }
    catch(err){
      console.log(err)
    }
    storeData("nfdi").then((res)=>{
      console.log("res in" , res)
    })
    if(data!=null){
      this.props.navigation.navigate('News')
    }
  }

 

  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      alert(JSON.stringify(result));
      // if(token){
      //   this.props.navigation.navigate("News")
      // } 

      this.setState({ user_name: 'Welcome' + ' ' + result.name });
      this.setState({ token: 'User Token: ' + ' ' + result.id });
      this.setState({ profile_pic: result.picture.data.url });
      // this.setState({data:result})
      this.storeData(result)
      console.log(this.state.data)
    }
  };

  signIn = async () => {
    try { 
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      console.log("User Info", userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error)
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error)

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error)

        // play services not available or outdated
      } else {
        console.log("uthis:",error)

        // some other error happened
      }
    }
  };

  getCurrentUserInfo = async () => { 
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
      console.log("User" , userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        console.log(error)
      } else {
        console.log(error)

        // some other error
      }
    }
  };

  onLogout = () => {
    //Clear the state after logout
    this.setState({ user_name: null, token: null, profile_pic: null });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.profile_pic ? (
          <Image
            source={{ uri: this.state.profile_pic }}
            style={styles.imageStyle}
          />
        ) : null}
        <Text style={styles.text}> {this.state.user_name} </Text>
        <Text> {this.state.token} </Text>

       {

        <LoginButton
          readPermissions={['public_profile']}
          
          onLoginFinished={(error, result) => {
            if (error) {
              alert(error);
              alert('login has error: ' + result.error);
            } else if (result.isCancelled) {
              alert('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                alert(data.accessToken.toString());

                const processRequest = new GraphRequest(
                  '/me?fields=name,picture.type(large)',
                  null,
                  this.get_Response_Info
                );
                // Start the graph request.
                new GraphRequestManager().addRequest(processRequest).start();
              }).then(()=>{
                // console.log("Data" , this.state.data)
                this.props.navigation.navigate('News')
              });
            }
          }} 
        />
  }
        <Text>Or</Text>

            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.signIn}
                disabled={this.state.isSigninInProgress} 
            />
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('News')} >
          <Text>Show</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center'
  },
  text: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
});