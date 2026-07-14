
// TASK 3: FETCH WITH RETRY AND EXPONENTIAL BACKOFF


console.log('========== TASK 3: Fetch with Retry and Exponential Backoff ==========\n');

// MAIN FUNCTION: fetchWithRetry

async function fetchWithRetry(url, maxRetries = 3) {
  const startTime = Date.now();
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} of ${maxRetries} for ${url}...`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      const elapsed = Date.now() - startTime;
      console.log(`✅ Attempt ${attempt} of ${maxRetries}: Success! (${elapsed}ms)`);
      return data;
      
    } catch (error) {
      if (attempt === maxRetries) {
        const elapsed = Date.now() - startTime;
        console.log(`❌ Attempt ${attempt} of ${maxRetries} failed.`);
        throw new Error(`Failed after ${maxRetries} attempts: ${error.message} (${elapsed}ms)`);
      }
      
      const waitTime = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
      console.log(`❌ Attempt ${attempt} of ${maxRetries} failed. Retrying in ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

console.log('✅ Retry function loaded successfully!');
console.log('='.repeat(60));

// ============================================
// TESTING
// ============================================

// ============================================
// Test 1: Valid URL (should succeed on first attempt)
// ============================================
console.log('\n--- Test 1: Valid URL ---\n');

async function testValidUrl() {
  console.log('Fetching https://jsonplaceholder.typicode.com/posts/1...\n');
  
  try {
    const data = await fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1', 3);
    console.log('\n✅ Data:', data);
    console.log(`📝 Title: ${data.title}`);
    console.log(`📝 Body: ${data.body.substring(0, 50)}...`);
  } catch (error) {
    console.error('\n❌ Failed:', error.message);
  }
}

await testValidUrl();

console.log('\n' + '-'.repeat(60) + '\n');

// ============================================
// Test 2: Invalid URL (should retry and fail)
// ============================================
console.log('--- Test 2: Invalid URL ---\n');

async function testInvalidUrl() {
  console.log('Fetching https://jsonplaceholder.typicode.com/nonexistent...\n');
  
  try {
    const data = await fetchWithRetry('https://jsonplaceholder.typicode.com/nonexistent', 3);
    console.log('Data:', data);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

await testInvalidUrl();

console.log('\n' + '-'.repeat(60) + '\n');

// ============================================
// Test 3: Different retry counts
// ============================================
console.log('--- Test 3: Different Retry Counts ---\n');

async function testRetryCounts() {
  console.log('Testing with maxRetries = 2...\n');
  
  try {
    await fetchWithRetry('https://jsonplaceholder.typicode.com/nonexistent', 2);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

await testRetryCounts();

console.log('\n' + '-'.repeat(60) + '\n');

// Test 4: Success after simulated failure

console.log('--- Test 4: Success after simulated failure ---\n');

// Simulate a failing endpoint that succeeds after retry
async function simulateRetrySuccess() {
  let attempts = 0;
  
  // Override fetch for testing
  const originalFetch = global.fetch;
  global.fetch = async function(url) {
    attempts++;
    if (attempts < 3) {
      throw new Error('Simulated network error');
    }
    return originalFetch(url);
  };
  
  try {
    console.log('Simulating 2 failures then success...\n');
    const data = await fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1', 3);
    console.log('\n✅ Success after retry:', data);
  } catch (error) {
    console.error('Failed:', error.message);
  } finally {
    // Restore original fetch
    global.fetch = originalFetch;
  }
}

await simulateRetrySuccess();

console.log('\n' + '='.repeat(60));
console.log('✅ All retry tests complete!');
console.log('='.repeat(60));