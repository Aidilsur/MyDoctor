import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gap, Header, List, Profile} from '../../components';
import {colors, getData} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {getAuth, signOut, updatePassword} from 'firebase/auth';
import {Firebase} from '../../config';
import {showMessage} from 'react-native-flash-message';

const UserProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: 'Aidil Surya',
    profession: 'FrontEnd Developer',
    photo: ILNullPhoto,
  });
  useEffect(() => {
    getData('user').then(res => {
      console.log('res : ', res);
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  }, []);

  const handleLogOut = () => {
    const auth = getAuth(Firebase);
    signOut(auth)
      .then(() => {
        // logout
        console.log('success sign out');
        navigation.replace('GetStarted');
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.error,
          color: 'white',
        });
      });
  };
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {/* {profile.photo.length > 0 && ( */}
      <Profile
        name={profile.fullName}
        desc={profile.profession}
        photo={profile.photo}
      />
      {/* )} */}
      {/* <Profile name={profile.fullName} desc={profile.profession} /> */}
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        desc="Last Update Yesterday"
        type="next"
        icon="language"
      />
      <List
        name="Give Us Rate"
        desc="Last Update Yesterday"
        type="next"
        icon="rate"
      />
      <List
        name="Sign Out"
        desc="Last Update Yesterday"
        type="next"
        icon="help"
        onPress={handleLogOut}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: 'white'},
});
