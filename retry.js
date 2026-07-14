
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