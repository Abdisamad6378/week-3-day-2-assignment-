// TASK 2: API RACE

console.log('========== TASK 2: API Race ==========\n');

const API_URLS = {
  post: 'https://jsonplaceholder.typicode.com/posts/1',
  user: 'https://jsonplaceholder.typicode.com/users/1',
  todo: 'https://jsonplaceholder.typicode.com/todos/1'
};


// HELPER: fetch with timing

async function fetchWithTiming(url, label) {
  const start = Date.now();
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const duration = Date.now() - start;
    return { data, duration, label, success: true };
  } catch (error) {
    const duration = Date.now() - start;
    return { error: error.message, duration, label, success: false };
  }
}

// PROMISE.ALL

console.log('--- Promise.all Results ---\n');

async function fetchAll() {
  const overallStart = Date.now();
  
  try {
    const [post, user, todo] = await Promise.all([
      fetchWithTiming(API_URLS.post, 'post'),
      fetchWithTiming(API_URLS.user, 'user'),
      fetchWithTiming(API_URLS.todo, 'todo')
    ]);
    
    const overallDuration = Date.now() - overallStart;
    
    console.log('Post:', post.data);
    console.log('User:', user.data);
    console.log('Todo:', todo.data);
    console.log(`\nAll completed in: ${overallDuration}ms`);
    
    return { post, user, todo, overallDuration };
  } catch (error) {
    console.error('Promise.all failed:', error);
  }
}

const allResults = await fetchAll();

console.log('\n' + '-'.repeat(60) + '\n');

// INDIVIDUAL TIMINGS

console.log('--- Individual Timings ---\n');

console.log(`posts: ${allResults.post.duration}ms`);
console.log(`users: ${allResults.user.duration}ms`);
console.log(`todos: ${allResults.todo.duration}ms`);

console.log('\n' + '='.repeat(60));
console.log('✅ Promise.all and timing complete!');
console.log('='.repeat(60));