import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { getStressColors } from '../../utils/constants';
import { useState } from 'react';

const topics = [
  {
    title: 'Salud',
    background: '#DBEAFE',
    subtitle: 'Maintaining a healthy lifestyle',
    shortContent: 'Invest in stocks that have high earning potential. Diversify your portfolio to minimize risk.'
  },
  {
    title: 'Organización',
    background: '#DCFCE7',
    subtitle: 'Top tips for managing your money',
    shortContent: 'Invest in stocks that have high earning potential. Diversify your portfolio to minimize risk.'
  }
  // {
  //   title: 'Finanzas',
  //   background: '#FEF9C3',
  //   subtitle: 'Climbing the corporate ladder',
  //   shortContent: 'Invest in stocks that have high earning potential. Diversify your portfolio to minimize risk.'
  // }, {
  //   title: 'Salud',
  //   background: '#DBEAFE',
  //   subtitle: 'Maintaining a healthy lifestyle',
  //   shortContent: 'Invest in stocks that have high earning potential. Diversify your portfolio to minimize risk.'
  // },
  // {
  //   title: 'Organización',
  //   background: '#DCFCE7',
  //   subtitle: 'Top tips for managing your money',
  //   shortContent: 'Invest in stocks that have high earning potential. Diversify your portfolio to minimize risk.'
  // }
];

const Advices = ({ stress }) => {
  const [visible, setVisible] = useState(false);

  return (
    <LinearGradient
      colors={getStressColors(stress)}
      style={{ flex: 1 }}
    >
      {/* <CustomModal
        visible={visible}
        setVisible={setVisible}
      >
        <Text>Invest in stocks that have high earning potential. Diversify your portfolio to minimize risk.</Text>
      </CustomModal> */}
      <ScrollView style={{ marginTop: 10 }}>
        {topics.map((topic, index) => (
          <View key={index} style={styles.containerAdvice}>
            <View style={[styles.header, { backgroundColor: topic.background }]}>
              <Text style={styles.headerTitle}>{topic.title}</Text>
              <Text style={styles.headerSubtitle}>{topic.subtitle}</Text>
            </View>

            <View style={styles.content}>
              <Text>{topic.shortContent}</Text>
              <Pressable style={styles.button} onPress={() => setVisible(true)}>
                <Text>Leer más</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => {
  return {
    stress: state.stress.stress
  };
};

export default connect(mapStateToProps, null)(Advices);

const styles = StyleSheet.create({
  containerAdvice: {
    margin: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 3
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 20,
    paddingLeft: 5
  },
  headerSubtitle: {
    color: '#727580',
    paddingLeft: 5
  },
  header: {
    padding: 5
  },
  content: {
    backgroundColor: '#FAFAFA',
    padding: 10
  },
  button: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    width: 80,
    marginVertical: 10
  }
});
