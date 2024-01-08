import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import { useState } from 'react';
import BottomSheet from '../BottomSheet';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../PrimaryButton';
import { CONTAINER_COLORS } from '../../utils/constants';
import { connect } from 'react-redux';
import { changeContainerColors } from '../../redux/actions';
import { useActions } from '../../hooks/useActions';

const ColorPicker = ({ label, close, containerColors }) => {
  const [selectedColors, setSelectedColors] = useState(containerColors);
  const { t } = useTranslation();

  const { changeContainerColors } = useActions();

  const handleColorChange = (containerName, index) => {
    setSelectedColors((prevSelectedColors) => ({
      ...prevSelectedColors,
      [containerName]: index
    }));
  };

  const onSaveColors = () => {
    changeContainerColors(selectedColors);
    close(null);
  };

  return (
    <View>
      <BottomSheet close={close} title={label} size={380}>
        <View style={styles.container}>
          <View style={styles.sheetBody}>
            {CONTAINER_COLORS.map(container => (
              <View key={container.name} style={styles.containerType}>
                <View style={styles.containerName}>
                  <Text style={styles.containerText}>{t(container.name)}</Text>
                </View>
                <View style={styles.group}>
                  {container.colors.map((item, index) => {
                    const isActive = selectedColors[container.name] === index;
                    return (
                      <View key={item}>
                        <TouchableWithoutFeedback onPress={() => handleColorChange(container.name, index)}>
                          <View style={[styles.circle, isActive && { borderColor: item }]}>
                            <View style={[styles.circleInside, { backgroundColor: item }]} />
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
          <View style={styles.containerButton}>
            <PrimaryButton title={t('confirm')} onChange={onSaveColors} />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    containerColors: state.containerColors.containerColors
  };
};

export default connect(mapStateToProps, { changeContainerColors })(ColorPicker);

const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;

const styles = StyleSheet.create({
  containerName: {
    alignSelf: 'center',
    marginBottom: 12,
    width: 100
  },
  containerText: {
    fontSize: 16,
    fontWeight: '500'
  },
  containerType: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  sheetBody: {
    paddingHorizontal: 24
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 12
  },
  circle: {
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    borderRadius: 9999,
    backgroundColor: 'white',
    borderWidth: CIRCLE_RING_SIZE,
    borderColor: 'transparent',
    marginRight: 8,
    marginBottom: 12
  },
  circleInside: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 9999,
    position: 'absolute',
    top: CIRCLE_RING_SIZE,
    left: CIRCLE_RING_SIZE
  }
});
