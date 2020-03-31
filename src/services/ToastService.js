import { Toast } from 'native-base';

function showToast(message) {
  return (
    Toast.show({
      text: message,
      buttonText: 'Okay',
      duration: 5000,
      type: 'danger'
    })
  );
}

function showGreenToast(message) {
  return (
    Toast.show({
      text: message,
      position: "top",
      duration: 2000,
      type: 'success'
    })
  );
}

export default {
  showToast,
  showGreenToast
};
