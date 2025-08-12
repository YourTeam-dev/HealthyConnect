// Comprehensive debug script to test real-time messaging
// Run this after starting the backend server

const io = require('socket.io-client');

// Test configuration
const BASE_URL = 'http://localhost:5000';
const DOCTOR_USER_ID = 1; // Replace with actual doctor user ID
const PATIENT_USER_ID = 2; // Replace with actual patient user ID
const APPOINTMENT_ID = 1; // Replace with actual appointment ID

console.log('🧪 Testing real-time messaging with comprehensive debugging...\n');

// Test 1: Doctor joins chat
console.log('1️⃣ Testing doctor chat connection...');
const doctorSocket = io(`${BASE_URL}/chat`);

doctorSocket.on('connect', () => {
  console.log('✅ Doctor socket connected');
  console.log('🔌 Doctor socket ID:', doctorSocket.id);
  doctorSocket.emit('join-user', DOCTOR_USER_ID);
});

doctorSocket.on('joined', (data) => {
  console.log('✅ Doctor joined chat room:', data);
  console.log('🔌 Doctor joining appointment room:', APPOINTMENT_ID);
  doctorSocket.emit('join-appointment', APPOINTMENT_ID);
});

doctorSocket.on('appointment-joined', (data) => {
  console.log('✅ Doctor joined appointment room:', data);
});

doctorSocket.on('new-message', (message) => {
  console.log('✅ Doctor received new message:', message.content);
  console.log('📝 Message details:', {
    id: message.id,
    senderId: message.senderId,
    receiverId: message.receiverId,
    content: message.content,
    timestamp: message.createdAt,
    appointmentId: message.appointmentId
  });
});

// Test 2: Patient joins chat
console.log('\n2️⃣ Testing patient chat connection...');
const patientSocket = io(`${BASE_URL}/chat`);

patientSocket.on('connect', () => {
  console.log('✅ Patient socket connected');
  console.log('🔌 Patient socket ID:', patientSocket.id);
  patientSocket.emit('join-user', PATIENT_USER_ID);
});

patientSocket.on('joined', (data) => {
  console.log('✅ Patient joined chat room:', data);
  console.log('🔌 Patient joining appointment room:', APPOINTMENT_ID);
  patientSocket.emit('join-appointment', APPOINTMENT_ID);
});

patientSocket.on('appointment-joined', (data) => {
  console.log('✅ Patient joined appointment room:', data);
});

patientSocket.on('new-message', (message) => {
  console.log('✅ Patient received new message:', message.content);
  console.log('📝 Message details:', {
    id: message.id,
    senderId: message.senderId,
    receiverId: message.receiverId,
    content: message.content,
    timestamp: message.createdAt,
    appointmentId: message.appointmentId
  });
});

// Test 3: Send message from doctor to patient
setTimeout(() => {
  console.log('\n3️⃣ Testing message sending from doctor to patient...');
  console.log('📤 Doctor sending message to patient:', PATIENT_USER_ID);
  console.log('📤 Appointment ID:', APPOINTMENT_ID);
  
  doctorSocket.emit('send-message', {
    receiverId: PATIENT_USER_ID,
    appointmentId: APPOINTMENT_ID,
    content: 'Hello patient! This is a test message from the doctor.',
    type: 'TEXT'
  });
}, 3000);

// Test 4: Send message from patient to doctor
setTimeout(() => {
  console.log('\n4️⃣ Testing message sending from patient to doctor...');
  console.log('📤 Patient sending message to doctor:', DOCTOR_USER_ID);
  console.log('📤 Appointment ID:', APPOINTMENT_ID);
  
  patientSocket.emit('send-message', {
    receiverId: DOCTOR_USER_ID,
    appointmentId: APPOINTMENT_ID,
    content: 'Hello doctor! This is a test message from the patient.',
    type: 'TEXT'
  });
}, 6000);

// Test 5: Test multiple messages for real-time sync
setTimeout(() => {
  console.log('\n5️⃣ Testing multiple messages for real-time sync...');
  doctorSocket.emit('send-message', {
    receiverId: PATIENT_USER_ID,
    appointmentId: APPOINTMENT_ID,
    content: 'Second message: How are you feeling today?',
    type: 'TEXT'
  });
}, 9000);

setTimeout(() => {
  console.log('\n6️⃣ Testing patient response...');
  patientSocket.emit('send-message', {
    receiverId: DOCTOR_USER_ID,
    appointmentId: APPOINTMENT_ID,
    content: 'I am feeling much better, thank you doctor!',
    type: 'TEXT'
  });
}, 12000);

// Test 7: Test rapid message sending
setTimeout(() => {
  console.log('\n7️⃣ Testing rapid message sending...');
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log(`📤 Sending rapid message ${i} from doctor to patient`);
      doctorSocket.emit('send-message', {
        receiverId: PATIENT_USER_ID,
        appointmentId: APPOINTMENT_ID,
        content: `Rapid message ${i}: Testing real-time sync`,
        type: 'TEXT'
      });
    }, i * 500);
  }
}, 15000);

// Test 8: Test patient sending multiple messages
setTimeout(() => {
  console.log('\n8️⃣ Testing patient sending multiple messages...');
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log(`📤 Sending rapid message ${i} from patient to doctor`);
      patientSocket.emit('send-message', {
        receiverId: DOCTOR_USER_ID,
        appointmentId: APPOINTMENT_ID,
        content: `Patient message ${i}: Testing real-time sync from patient`,
        type: 'TEXT'
      });
    }, i * 500);
  }
}, 18000);

// Cleanup after tests
setTimeout(() => {
  console.log('\n🧹 Cleaning up test connections...');
  doctorSocket.disconnect();
  patientSocket.disconnect();
  console.log('✅ Test completed');
  process.exit(0);
}, 24000);

// Error handling
doctorSocket.on('error', (error) => {
  console.error('❌ Doctor socket error:', error);
});

patientSocket.on('error', (error) => {
  console.error('❌ Patient socket error:', error);
});

doctorSocket.on('disconnect', () => {
  console.log('🔌 Doctor socket disconnected');
});

patientSocket.on('disconnect', () => {
  console.log('🔌 Patient socket disconnected');
});

// Connection status monitoring
setInterval(() => {
  console.log(`\n📊 Connection Status:`);
  console.log(`   Doctor: ${doctorSocket.connected ? '🟢 Connected' : '🔴 Disconnected'} (ID: ${doctorSocket.id})`);
  console.log(`   Patient: ${patientSocket.connected ? '🟢 Connected' : '🔴 Disconnected'} (ID: ${patientSocket.id})`);
}, 3000);

console.log('\n💡 Instructions:');
console.log('1. Start your backend server');
console.log('2. Open the frontend in two browser tabs (one as doctor, one as patient)');
console.log('3. Navigate to the Messages page in both tabs');
console.log('4. Run this test script: node test_realtime_debug.js');
console.log('5. Watch the console for real-time message updates');
console.log('6. Messages should appear immediately without page refresh');
console.log('7. Check both browser consoles to see if messages are received');
console.log('8. Look for any error messages or missing socket events');
