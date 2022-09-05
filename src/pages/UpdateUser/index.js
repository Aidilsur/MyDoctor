import {getAuth, onAuthStateChanged, updatePassword} from 'firebase/auth';
import {getDatabase, ref, update} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {Firebase} from '../../config';
import {colors, getData, storeData} from '../../utils';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });

  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDb, setPhotoForDb] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      console.log('res', res);
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  const saveProfile = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'Password kurang dari 6 karakter',
          type: 'default',
          backgroundColor: colors.error,
          color: 'white',
        });
      } else {
        // update password
        functionUpdatePassword();
        updateProfileData();
        navigation.replace('MainApp');
      }
    } else {
      updateProfileData();
    }
  };

  const functionUpdatePassword = () => {
    const auth = getAuth(Firebase);
    onAuthStateChanged(auth, user => {
      if (user) {
        // update password
        updatePassword(user, password).catch(err => {
          showMessage({
            message: err.message,
            type: 'default',
            backgroundColor: colors.error,
            color: 'white',
          });
        });
      }
    });
  };

  const getImage = () => {
    launchImageLibrary(
      {quality: 0.5, maxWidth: 200, maxHeight: 200, includeBase64: true},
      response => {
        // console.log('response : ', response.assets[0].uri);
        if (response.didCancel) {
          showMessage({
            message: 'oops, sepertinya anda tidak memilih foto',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          console.log('response getImage', response);
          setPhotoForDb(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );
          const source = {uri: response.assets[0].uri};
          setPhoto(source);
        }
      },
    );
  };

  const updateProfileData = () => {
    const db = getDatabase(Firebase);
    const updates = {};
    const data = profile;
    data.photo = photoForDb;
    updates['users/' + profile.uid] = data;
    update(ref(db), updates)
      .then(() => {
        storeData('user', data);
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'default',
          backgroundColor: colors.error,
        });
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={() => saveProfile()} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {padding: 40, paddingTop: 0},
});
