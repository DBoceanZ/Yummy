import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20
  },
  imageContainer: {
    alignItems: 'center'
  },
  imageTouchable: {
    width: 100,
    height: 100,
    backgroundColor: 'grey',
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15
  },
  displayName: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20
  },
  countersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    marginBottom: 15
  },
  counterItem: {
    flex: 1,
    alignItems: 'center',
  },
  counterDivider: {
    color: 'lightgrey',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '100'
  },
  counter: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  counterLabel: {
    color: 'black',
    textAlign: 'center'
  },
  buttonContainer: {
    justifyContent: 'center',
    paddingHorizontal: 70,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  }
});

export default styles;