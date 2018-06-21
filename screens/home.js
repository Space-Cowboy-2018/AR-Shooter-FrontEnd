import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button
} from 'native-base';
import { Text, View } from 'react-native';
export default class FloatingLabelExample extends Component {
  constructor() {
    super();
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    const { navigate } = this.props.navigation;
    navigate('ARScene');
    // const { navigate } = this.props.navigation;
    // navigate(ARScene);
  }
  render() {
    return (
      <View style={styles.main}>
        <Content style={styles.items}>
          <Text style={styles.title}>AR Shooter</Text>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input />
            </Item>
          </Form>
        </Content>
        <Button onPress={this.handlePress} style={{ marginTop: 40 }} full light>
          <Text>Start Game</Text>
        </Button>
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
    fontSize: 30,
    textAlign: 'center',
    margin: 30,
    letterSpacing: 2
  },
  items: {
    marginLeft: 20,
    marginRight: 20
  }
};
