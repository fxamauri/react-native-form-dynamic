import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputs: [],
        };

    }


    handleShareholderValueChange = (idx) => (evt) => {
        const newShareholders = this.state.inputs.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, id: idx, valor: evt };
        });

        this.setState({ inputs: newShareholders });
    };

    handleAddShareholder = () => {
        this.setState({ inputs: this.state.inputs.concat([{ valor: '0' }]) });
    };

    handleRemoveShareholder = (idx) => () => {
        this.setState({ inputs: this.state.inputs.filter((s, sidx) => idx !== sidx) });
    };

    render() {
    return (
      <View style={{ flex: 1}}>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

              <Text>
                  {
                      this.state.inputs.reduce((acc, { valor }) => parseFloat(acc) +  parseFloat(valor), 0)
                  }
              </Text>

          </View>

          <View style={{ flex: 2, justifyContent: 'center', margin: 10 }}>

              {this.state.inputs.map((shareholder, idx) => (
                  <TextInput
                      key={idx}
                      style={styles.inputs}
                      onChangeText={this.handleShareholderValueChange(idx)}
                      value={shareholder.valor}
                  />
              ))}
          </View>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

              <Button
                  onPress={ () => {
                      this.handleAddShareholder();

                      console.log(this.state);
                  } }
                  title="Add"
                  color="#841584"
              />

          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});
