import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Divider, Button, Block, Text, Switch} from '../components';
import theme from '../modules/theme';
import {Auth} from 'aws-amplify';
import {pushLoginScreen} from '../navigation';

class Settings extends Component {
  state = {
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
    editing: null,
    profile: {},
  };

  componentDidMount() {
    this.setState({profile: this.props.profile});
  }

  handleEdit(name, text) {
    const {profile} = this.state;
    profile[name] = text;

    this.setState({profile});
  }

  toggleEdit(name) {
    const {editing} = this.state;
    this.setState({editing: !editing ? name : null});
  }

  renderEdit(name) {
    const {profile, editing} = this.state;

    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          style={{color: theme.colors.black}}
          onChangeText={text => this.handleEdit([name], text)}
        />
      );
    }

    return (
      <Text body bold>
        {profile[name]}
      </Text>
    );
  }

  async handleLogout() {
    try {
      await Auth.signOut({global: true});
      pushLoginScreen();
    } catch (e) {
      console.log(e.message);
    }
  }

  render() {
    const {profile, editing} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Block>
          <Block flex={false} row center space="between" style={styles.header}>
            <Text h1 bold>
              Mi cuenta
            </Text>
            <Button>
              <Image source={profile.avatar} style={styles.avatar} />
            </Button>
          </Block>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.inputs}>
              <Block
                row
                space="between"
                margin={[10, 0]}
                style={styles.inputRow}>
                <Block>
                  <Text header gray style={{marginBottom: 10}}>
                    Nombre
                  </Text>
                  {this.renderEdit('username')}
                </Block>
                <Text
                  medium
                  primary
                  onPress={() => this.toggleEdit('username')}>
                  {editing === 'username' ? 'Save' : 'Edit'}
                </Text>
              </Block>
              <Block
                row
                space="between"
                margin={[10, 0]}
                style={styles.inputRow}>
                <Block>
                  <Text header gray style={{marginBottom: 10}}>
                    Ubicacion
                  </Text>
                  {this.renderEdit('location')}
                </Block>
                <Text
                  medium
                  secondary
                  onPress={() => this.toggleEdit('location')}>
                  {editing === 'location' ? 'Save' : 'Editar'}
                </Text>
              </Block>
              <Block
                row
                space="between"
                margin={[10, 0]}
                style={styles.inputRow}>
                <Block>
                  <Text header gray style={{marginBottom: 10}}>
                    E-mail
                  </Text>
                  <Text body bold>
                    {profile.email}
                  </Text>
                </Block>
              </Block>
            </Block>

            <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />

            {/*<Block style={styles.sliders}>
              <Block margin={[10, 0]}>
                <Text header gray style={{marginBottom: 10}}>
                  Budget
                </Text>
                <Slider
                  minimumValue={0}
                  maximumValue={1000}
                  style={{height: 19}}
                  thumbStyle={styles.thumb}
                  trackStyle={{height: 6, borderRadius: 6}}
                  minimumTrackTintColor={theme.colors.primary}
                  maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                  value={this.state.budget}
                  onValueChange={value => this.setState({budget: value})}
                />
                <Text caption gray right>
                  $1,000
                </Text>
              </Block>
              <Block margin={[10, 0]}>
                <Text header gray style={{marginBottom: 10}}>
                  Monthly Cap
                </Text>
                <Slider
                  minimumValue={0}
                  maximumValue={5000}
                  style={{height: 19}}
                  thumbStyle={styles.thumb}
                  trackStyle={{height: 6, borderRadius: 6}}
                  minimumTrackTintColor={theme.colors.primary}
                  maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                  value={this.state.monthly}
                  onValueChange={value => this.setState({monthly: value})}
                />
                <Text caption gray right>
                  $5,000
                </Text>
              </Block>
            </Block>

            <Divider />*/}

            <Block style={styles.toggles}>
              <Block
                row
                center
                space="between"
                style={{marginBottom: theme.sizes.base * 2}}>
                <Text header gray>
                  Notifications
                </Text>
                <Switch
                  value={this.state.notifications}
                  onValueChange={value => this.setState({notifications: value})}
                />
              </Block>

              <Block
                row
                center
                space="between"
                style={{marginBottom: theme.sizes.base * 2}}>
                <Text header gray>
                  Newsletter
                </Text>
                <Switch
                  value={this.state.newsletter}
                  onValueChange={value => this.setState({newsletter: value})}
                />
              </Block>
            </Block>
            <Block>
              <Button onPress={this.handleLogout}>
                <Text center h3 semibold color={theme.colors.primary}>
                  Cerrar sesion
                </Text>
              </Button>
            </Block>
          </ScrollView>
        </Block>
      </SafeAreaView>
    );
  }
}

Settings.defaultProps = {
  profile: {
    username: 'react-ui-kit',
    location: 'Barranquilla',
    email: 'contact@sub.com',
    avatar: require('../assets/images/avatar.png'),
    budget: 1000,
    monthly_cap: 5000,
    notifications: true,
    newsletter: false,
  },
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end',
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.primary,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  container: {
    flex: 1,
  },
});
