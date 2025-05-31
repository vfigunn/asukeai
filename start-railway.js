const { spawn } = require('child_process');
const path = require('path');
const express = require('express');

// Function to start the backend
function startBackend() {
  console.log('🚀 Starting backend server...');
  const backend = spawn('node', ['backend/dist/server.js'], {
    env: { ...process.env, PORT: '3001' },
    stdio: 'inherit'
  });

  backend.on('error', (error) => {
    console.error('❌ Failed to start backend:', error);
    process.exit(1);
  });

  return backend;
}

// Function to serve the frontend
function serveFrontend() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  // Serve static files from the dist directory
  app.use(express.static(path.join(__dirname, 'dist')));

  // Handle client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`✅ Frontend server running on port ${PORT}`);
    console.log(`🌐 Access your app at http://localhost:${PORT}`);
  });
}

// Main function
async function main() {
  console.log('🎯 Starting Asukeai application...');
  
  // Start backend
  const backendProcess = startBackend();
  
  // Give backend time to start
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Start frontend
  serveFrontend();
  
  // Handle shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    backendProcess.kill();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
});