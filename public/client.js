const socket = io();

let user;
const d = new Date();

let textarea = document.querySelector("#textarea");
let messagArea = document.querySelector(".msg_area");
let sendMessagebutton = document.querySelector(".send_message");
let SideBar = document.querySelector(".sidebar");
// let user_logo = document.querySelector("#user_logo")

const appendList = (user) => {
  const h2Text = "User"
  let markup = `
        <h2>${h2Text}</h2>
        <ul>
        <li><a><img id="user-logo" src="/public/image/User${Math.floor(Math.random() * 3) + 1}.png">${user}</a></li>
        </ul>
    `;
  SideBar.innerHTML = markup;
//   document.getElementById('user_logo').src = "./images/User.png"
  // messagArea.appendChild(mainDiv);
};

do {
  user = prompt("Please Enter Your Name..");
  appendList(user);
} while (!user);

textarea.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    sendMessage(e.target.value);
    e.target.value = "";
  }
});

// Send Message (OUTGOING)
sendMessagebutton.addEventListener("click", (e) => {
  sendMessage(textarea.value);
  textarea.value = "";
  scrollTobottom();
  // console.log("Clicked");
});

const sendMessage = (message) => {
  let msg = {
    user: user,
    message: message.trim(),
  };
  // Append Message to The text area
  appenMessage(msg, "outgoing");

  // Send to server
  socket.emit("message", msg);
};

const appenMessage = (msg, type) => {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        <small>${d.getHours()} : ${d.getMinutes()}</small>
    `;
  mainDiv.innerHTML = markup;
  messagArea.appendChild(mainDiv);
};

// Recieving message

socket.on("message", (msg) => {
  appenMessage(msg, "incoming");
//   console.log(msg);
  scrollTobottom();
});

const scrollTobottom = () => {
  messagArea.scrollTop = messagArea.scrollHeight;
};
