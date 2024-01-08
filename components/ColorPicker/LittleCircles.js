import { StyleSheet, View } from 'react-native';
import { CONTAINER_COLORS } from '../../utils/constants';
import { connect } from 'react-redux';

const LittleCircles = ({ containerColors }) => {
  console.log(containerColors);
  return (
    <View style={styles.container}>
      {Object.keys(containerColors).map(key => (
        <View
          key={key}
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: CONTAINER_COLORS.find(item => item.name === key).colors[containerColors[key]],
            margin: 5
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

// export default LittleCircles;
const mapStateToProps = (state) => {
  return {
    containerColors: state.containerColors.containerColors
  };
};

export default connect(mapStateToProps, null)(LittleCircles);
