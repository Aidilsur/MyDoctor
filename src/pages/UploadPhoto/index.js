import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, Header, Link} from '../../components';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../assets';
import {colors, fonts} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

const UploadPhoto = ({navigation, route}) => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const {fullName, profession} = route.params;

  const getImage = () => {
    launchImageLibrary({}, response => {
      // console.log('response : ', response.assets[0].uri);
      if (response.didCancel) {
        showMessage({
          message: 'oops, sepertinya anda tidak memilih foto',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        const source = {uri: response.assets[0].uri};
        setPhoto(source);
        setHasPhoto(true);
      }
    });
  };

  return (
    <View style={styles.page}>
      <Header title="Upload Photo" />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto ? (
              <IconRemovePhoto style={styles.addPhoto} />
            ) : (
              <IconAddPhoto style={styles.addPhoto} />
            )}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={() => navigation.replace('MainApp')}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            size={16}
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  content: {
    paddingHorizontal: 40,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 64,
  },
  profile: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  avatar: {width: 110, height: 110, borderRadius: 110 / 2},
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {position: 'absolute', bottom: 8, right: 6},
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 4,
  },
});
