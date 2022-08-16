const mainColors = {
  green1: '#0bcad4',
  green2: '#edfcdf',
  dark1: '#112340',
  dark2: '#495a75',
  dark3: '#8092af',
  grey1: '#7d8797',
  grey2: '#e9e9e9',
  grey3: '#edeef0',
  blue1: '#0066cb',
};

export const colors = {
  primary: mainColors.green1,
  secondary: mainColors.dark1,
  white: 'white',
  black: 'black',
  disable: mainColors.grey3,
  tertiary: mainColors.blue1,
  text: {
    primary: mainColors.dark1,
    secondary: mainColors.grey1,
    MenuInactive: mainColors.dark2,
    MenuActive: mainColors.green1,
    subTitle: mainColors.dark3,
  },
  button: {
    primary: {
      background: mainColors.green1,
      text: 'white',
    },
    secondary: {
      background: 'white',
      text: mainColors.dark1,
    },
  },
  border: mainColors.grey2,
  cardLight: mainColors.green2,
};
