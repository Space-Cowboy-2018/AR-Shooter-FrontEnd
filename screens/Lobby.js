import React, { Component } from 'react';
import io from 'socket.io-client';
import { SERVER_URL } from 'react-native-dotenv';
import { Content, Button, Icon } from 'native-base';
import { Text, View } from 'react-native';

const host = SERVER_URL;

export default class Home extends Component {
  render() {
    let { navigate } = this.props.navigation;
    let socket = this.props.navigation.state.params.socket;
    return (
      <View style={styles.main}>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon style={styles.backButton} name="arrow-back" />
        </Button>
        <Content style={styles.items}>
          <Text style={styles.title}>Lobby</Text>
          <Button
            onPress={() => navigate('ARScene', { socket: socket })}
            style={{ marginTop: 40 }}
            full
            light>
            <Text style={{ letterSpacing: 2 }}>Start Game</Text>
          </Button>
        </Content>
      </View>
    );
  }
}

const styles = {
  main: {
    backgroundColor: '#3D464E',
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Orbitron',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 60,
    letterSpacing: 2
  },
  items: {
    marginLeft: 20,
    marginRight: 20
  },
  backButton: {
    marginTop: 10,
    color: 'black'
  }
};
