import {child, get, getDatabase, ref} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ILHospitalBG} from '../../assets';
import {ListHospital} from '../../components';
import {Firebase} from '../../config';
import {colors, fonts} from '../../utils';

const Hospital = () => {
  const [hospital, setHospital] = useState([]);

  useEffect(() => {
    const database = ref(getDatabase(Firebase));
    get(child(database, `hospitals/`)).then(resDB => {
      if (resDB.val()) {
        setHospital(resDB.val());
      }
    });
  }, []);

  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospital</Text>
        <Text style={styles.desc}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        {hospital.map(item => {
          return (
            <ListHospital
              type={item.type}
              name={item.name}
              address={item.address}
              pic={item.image}
            />
          );
        })}
        {/* <ListHospital
          type="Rumah Sakit Anak"
          name="Happy Family & Kids"
          address="Jln. Surya Sejahtera 20"
          pic={DummyHospital2}
        />
        <ListHospital
          type="Rumah Sakit Jiwa"
          name="Tingkatan Paling Atas"
          address="Jln. Surya Sejahtera 20"
          pic={DummyHospital3}
        /> */}
      </View>
    </View>
  );
};

export default Hospital;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  background: {height: 240, paddingTop: 30},
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
});
