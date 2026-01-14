/**
 * Простой скрипт для тестирования API endpoints
 * Запуск: node stubs/api/scripts/test-api.js
 */

const BASE_URL = 'http://localhost:8099/api';

async function testEndpoint(method, path, body = null) {
  const url = `${BASE_URL}${path}`;
  console.log(`\n${method} ${path}`);
  
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2).substring(0, 500));
    
    if (response.status !== 200 && response.status !== 201) {
      console.error('❌ FAILED');
      return false;
    }
    
    console.log('✓ OK');
    return true;
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('=== Testing BroLearn API ===\n');
  
  let passed = 0;
  let failed = 0;
  
  // Test Modules
  console.log('\n--- Modules ---');
  if (await testEndpoint('GET', '/modules')) passed++; else failed++;
  if (await testEndpoint('GET', '/modules/prompting-basics')) passed++; else failed++;
  
  // Test Lessons
  console.log('\n--- Lessons ---');
  if (await testEndpoint('GET', '/lessons/lesson-gigachat-intro')) passed++; else failed++;
  
  // Test Exercises
  console.log('\n--- Exercises ---');
  if (await testEndpoint('GET', '/exercises/ex-gigachat-1')) passed++; else failed++;
  if (await testEndpoint('POST', '/exercises/ex-gigachat-1/submit', {
    type: 'multiple-choice',
    selectedOptions: ['a']
  })) passed++; else failed++;
  
  // Test Progress
  console.log('\n--- Progress ---');
  if (await testEndpoint('GET', '/progress')) passed++; else failed++;
  
  // Test Achievements
  console.log('\n--- Achievements ---');
  if (await testEndpoint('GET', '/achievements')) passed++; else failed++;
  
  // Test Stats
  console.log('\n--- Stats ---');
  if (await testEndpoint('GET', '/stats')) passed++; else failed++;
  
  // Summary
  console.log('\n=== Summary ===');
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${passed + failed}`);
  
  if (failed === 0) {
    console.log('\n✓ All tests passed!');
  } else {
    console.log('\n❌ Some tests failed');
    process.exit(1);
  }
}

runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
