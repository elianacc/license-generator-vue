
export default {
  licenseStatusFilter (value) {
    let expiryTime = new Date(value);
    let currentTime = new Date();
    if (expiryTime > currentTime) {
      return '有效'
    } else {
      return '已超期'
    }
  }
}