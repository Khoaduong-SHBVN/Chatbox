// Cấu hình Firebase chuẩn
const firebaseConfig = {
  apiKey: "AIzaSyCzzZLd7eI8xIWRM1Wa76GwmVIMQGu8Woc",
  authDomain: "chatbox-2da1f.firebaseapp.com",
  databaseURL: "https://chatbox-2da1f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatbox-2da1f",
  storageBucket: "chatbox-2da1f.appspot.com",
  messagingSenderId: "552314195135",
  appId: "1:552314195135:web:9a627e73908f4eb71c8a0a",
  measurementId: "G-BWTY22HN8N"
};

// Khởi tạo Firebase đúng cách cho bản compat
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();
const chatRef = db.ref("chat");

// DOM
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("messageInput");
const messagesDiv = document.getElementById("messages");
const authSection = document.getElementById("auth-section");
const chatSection = document.getElementById("chat-section");
const userEmailDisplay = document.getElementById("userEmail");

// Gán màu riêng
function getColorByName(name) {
  const colors = ["#007BFF", "#6f42c1", "#d63384", "#198754", "#fd7e14", "#20c997"];
  let total = 0;
  for (let i = 0; i < name.length; i++) {
    total += name.charCodeAt(i);
  }
  return colors[total % colors.length];
}

// Format thời gian
function formatTime(isoString) {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Gửi tin
function sendMessage() {
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  if (!name || !message) return;

  const timestamp = new Date().toISOString();
  chatRef.push({ name, message, timestamp });
  messageInput.value = "";
}

// Lắng nghe tin nhắn
chatRef.on("child_added", (snapshot) => {
  const data = snapshot.val();
  const msg = document.createElement("div");
  msg.className = "msg";
  const color = getColorByName(data.name);
  const time = data.timestamp ? formatTime(data.timestamp) : "";
  msg.innerHTML = `<strong style="color: ${color}">${data.name}:</strong> ${data.message} <span style="color:#aaa; font-size:0.85em">(${time})</span>`;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Đăng ký
function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!email || !password) return alert("Nhập email và mật khẩu");

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Đăng ký thành công!"))
    .catch(err => alert(err.message));
}

// Đăng nhập
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!email || !password) return alert("Nhập email và mật khẩu");

  auth.signInWithEmailAndPassword(email, password)
    .catch(err => alert(err.message));
}

// Đăng xuất
function logout() {
  auth.signOut();
}

// Kiểm tra trạng thái đăng nhập
auth.onAuthStateChanged(user => {
  if (user) {
    authSection.classList.add("hidden");
    chatSection.classList.remove("hidden");
    userEmailDisplay.textContent = user.email;
  } else {
    authSection.classList.remove("hidden");
    chatSection.classList.add("hidden");
    messagesDiv.innerHTML = "";
  }
});
