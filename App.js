import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useBLE from "./useBLE";
import DeviceModal from "./PulseIndicator";

const App = () => {
  const { requestPermissions, scanForPeripherals } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);


  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity onPress={openModal}>
        <Text style={styles.ctaButtonText}>Connect</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        // connectToPeripheral={connectToDevice}
        // devices={allDevices}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
export default App;
