function getDataWithTimeout(timeoutMs) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Firebase operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
    firebase.database().ref('path/to/data').once('value', (snapshot) => {
      clearTimeout(timeoutId);
      resolve(snapshot.val());
    }).catch(error => {
      clearTimeout(timeoutId);
      reject(error);
    });
  });
}

getDataWithTimeout(5000) //5 seconds timeout
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });