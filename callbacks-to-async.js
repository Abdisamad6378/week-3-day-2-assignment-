// TASK 1: CALLBACK → PROMISE → ASYNC/AWAIT

// ORIGINAL CALLBACK FUNCTIONS

// 1. Simulates reading a file
function readFile(filename, callback) {
  setTimeout(() => {
    if (filename === "missing.txt") callback(new Error("File not found"), null);
    else callback(null, `Contents of ${filename}`);
  }, 500);
}

// 2. Simulates fetching a user
function getUser(userId, callback) {
  setTimeout(() => {
    if (userId <= 0) callback(new Error("Invalid user ID"), null);
    else callback(null, { id: userId, name: "Amina", email: "amina@example.com" });
  }, 300);
}

// 3. Simulates saving to database
function saveToDb(data, callback) {
  setTimeout(() => {
    if (!data.name) callback(new Error("Name is required"), null);
    else callback(null, { ...data, id: Math.floor(Math.random() * 1000), saved: true });
  }, 400);
}

// TEST CALLBACK VERSIONS
console.log('--- CALLBACK VERSIONS ---\n');

console.log('=== readFile ===');
readFile('data.txt', (err, data) => {
  if (err) console.log('Callback Error:', err.message);
  else console.log('Callback:', data);
});

readFile('missing.txt', (err, data) => {
  if (err) console.log('Callback Error:', err.message);
  else console.log('Callback:', data);
});

console.log('\n=== getUser ===');
getUser(1, (err, data) => {
  if (err) console.log('Callback Error:', err.message);
  else console.log('Callback:', data);
});

getUser(0, (err, data) => {
  if (err) console.log('Callback Error:', err.message);
  else console.log('Callback:', data);
});

console.log('\n=== saveToDb ===');
saveToDb({ name: "Amina" }, (err, data) => {
  if (err) console.log('Callback Error:', err.message);
  else console.log('Callback:', data);
});

saveToDb({}, (err, data) => {
  if (err) console.log('Callback Error:', err.message);
  else console.log('Callback:', data);
});

console.log('\n' + '-'.repeat(60) + '\n');

// PROMISE VERSIONS

console.log('--- PROMISE VERSIONS ---\n');

function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    readFile(filename, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function getUserPromise(userId) {
  return new Promise((resolve, reject) => {
    getUser(userId, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function saveToDbPromise(data) {
  return new Promise((resolve, reject) => {
    saveToDb(data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Test Promise versions
console.log('=== readFilePromise ===');
readFilePromise('data.txt')
  .then(data => console.log('Promise:', data))
  .catch(err => console.log('Promise Error:', err.message));

readFilePromise('missing.txt')
  .then(data => console.log('Promise:', data))
  .catch(err => console.log('Promise Error:', err.message));

console.log('\n=== getUserPromise ===');
getUserPromise(1)
  .then(data => console.log('Promise:', data))
  .catch(err => console.log('Promise Error:', err.message));

getUserPromise(0)
  .then(data => console.log('Promise:', data))
  .catch(err => console.log('Promise Error:', err.message));

console.log('\n=== saveToDbPromise ===');
saveToDbPromise({ name: "Amina" })
  .then(data => console.log('Promise:', data))
  .catch(err => console.log('Promise Error:', err.message));

saveToDbPromise({})
  .then(data => console.log('Promise:', data))
  .catch(err => console.log('Promise Error:', err.message));

console.log('\n' + '='.repeat(60));
console.log('✅ Callback and Promise conversions complete!');
console.log('='.repeat(60));


// ASYNC/AWAIT VERSIONS

console.log('\n--- ASYNC/AWAIT VERSIONS ---\n');

async function readFileAsync(filename) {
  try {
    const data = await readFilePromise(filename);
    console.log('Async/Await:', data);
    return data;
  } catch (error) {
    console.log('Async/Await Error:', error.message);
    throw error;
  }
}

async function getUserAsync(userId) {
  try {
    const user = await getUserPromise(userId);
    console.log('Async/Await:', user);
    return user;
  } catch (error) {
    console.log('Async/Await Error:', error.message);
    throw error;
  }
}

async function saveToDbAsync(data) {
  try {
    const result = await saveToDbPromise(data);
    console.log('Async/Await:', result);
    return result;
  } catch (error) {
    console.log('Async/Await Error:', error.message);
    throw error;
  }
}

// Test Async/Await versions
console.log('=== readFileAsync ===');
await readFileAsync('data.txt');
await readFileAsync('missing.txt');

console.log('\n=== getUserAsync ===');
await getUserAsync(1);
await getUserAsync(0);

console.log('\n=== saveToDbAsync ===');
await saveToDbAsync({ name: "Amina" });
await saveToDbAsync({});

console.log('\n' + '-'.repeat(60) + '\n');

// COMBINED DEMONSTRATION

console.log('--- COMBINED DEMONSTRATION ---\n');

async function demonstrateAll() {
  console.log('Success case:');
  console.log('Callback:', await new Promise((resolve) => {
    readFile('data.txt', (err, data) => resolve(data));
  }));
  
  console.log('Promise:', await readFilePromise('data.txt'));
  console.log('Async/Await:', await readFileAsync('data.txt'));
  
  console.log('\nError case:');
  try {
    await readFilePromise('missing.txt');
  } catch (error) {
    console.log('Error handling:', error.message);
  }
}

await demonstrateAll();

console.log('\n' + '='.repeat(60));
console.log('✅ All versions complete!');
console.log('='.repeat(60));