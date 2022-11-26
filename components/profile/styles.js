import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
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
    marginBottom: 15
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15
  },
  username: {
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
  bioContainer: {
    marginBottom: 15,
    paddingHorizontal: 15
  },
  bio: {
    textAlign: 'center'
  },
  buttonContainer: {
    justifyContent: 'center',
    paddingHorizontal: 70,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  thumbnailsContainer: {
    flexDirection: 'row'
  },
  thumbnailContainer: {
    width: '33.3%',
    height: 188
  },
  thumbnail: {
    width: 'auto',
    height: 188,
    marginHorizontal: 0.5,
    marginVertical: 0.5
  }
});

export default styles;
