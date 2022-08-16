import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header, ListDoctor} from '../../components';
import {DummyDoctor1} from '../../assets';
import {colors} from '../../utils';

const ChooseDoctor = () => {
  return (
    <View style={styles.page}>
      <Header title="Pilih Dokter Anak" type="dark" />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Janie"
        desc="wanita"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Janie"
        desc="wanita"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Janie"
        desc="wanita"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Janie"
        desc="wanita"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Janie"
        desc="wanita"
      />
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
});
