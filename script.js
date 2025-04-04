// Cấu hình Firebase từ project của bạn
const firebaseConfig = {
  apiKey: "AIzaSyCzzLZdTeI8xIWRM1Wa76GwmVIMQGu8Woc",
  authDomain: "chatbox-2da1f.firebaseapp.com",
  databaseURL: "https://chatbox-2da1f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatbox-2da1f",
  storageBucket: "chatbox-2da1f.appspot.com",
  messagingSenderId: "552314195135",
  appId: "1:552314195135:web:9a627e73908f4eb71c8a0a",
  measurementId: "G-BWTY22HN8N"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Tham chiếu database realtime
const db = firebase.database();
const chatRef = db.ref("chat");

// DOM elements
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("messageInput");
const messagesDiv = document.getElementById("messages");

// Gửi tin nhắn
function sendMessage() {
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) return;

  const timestamp = new Date().toISOString();

  chatRef.push({
    name,
    message,
    timestamp
  });

  messageInput.value = "";
}

// Nhận tin nhắn realtime
chatRef.on("child_added", (snapshot) => {
  const data = snapshot.val();
  const msg = document.createElement("div");
  msg.className = "msg";
  msg.textContent = `${data.name}: ${data.message}`;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
