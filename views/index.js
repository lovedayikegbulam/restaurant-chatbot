const chatDiv = document.getElementById("chat");
      const messageInput = document.getElementById("messageInput");
      const sendButton = document.getElementById("sendButton");

      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      };

      const sessionId = getCookie("sessionId"); // Fetch sessionId from cookies

      // Debugging log to check the cookies
      // console.log("Cookies:", document.cookie);

      const addMessageToChat = (message, isBot) => {
        const messageElement = document.createElement("div");
        // messageElement.innerHTML = message.replace(/\n/g, '<br>');
        messageElement.textContent = message;
        messageElement.style.color = isBot ? "blue" : "black";
        chatDiv.appendChild(messageElement);
      };

      const fetchChatOptions = async () => {
        const response = await fetch("/api/chatbot/options");
        const data = await response.json();
        addMessageToChat(data.response, true);
      };

      const sendMessage = async () => {
        const message = messageInput.value;
        if (message.trim()) {
          addMessageToChat(message, false);

          const response = await fetch("/api/chatbot/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, message }),
          });

          const data = await response.json();
          addMessageToChat(data.response, true);

          messageInput.value = "";
        }
      };

      sendButton.addEventListener("click", sendMessage);
      messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      });

      fetchChatOptions();