import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class ChatbotComponent {
  messages: { sender: string, text: string }[] = [];
  userInput: string = '';
  chatHistory: { sender: string, text: string }[][] = [];
  activeChatIndex: number | null = null;

  // ✅ Updated API URL to Flask
  apiUrl: string = 'http://localhost:5002/chat';

  constructor(private http: HttpClient) {
    this.loadChatHistory();
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    if (this.activeChatIndex === null) {
      this.startNewChat();
    }

    this.messages.push({ sender: 'user', text: this.userInput });

    // ✅ Updated key: response.reply instead of response.response
    this.http.post<{ reply: string }>(this.apiUrl, { message: this.userInput })
      .subscribe({
        next: (response) => {
          this.messages.push({ sender: 'bot', text: response.reply });
          this.saveChatHistory();
        },
        error: (err) => {
          console.error(err);
          this.messages.push({ sender: 'bot', text: "Oops! Something went wrong." });
          this.saveChatHistory();
        }
      });

    this.userInput = '';
  }

  startNewChat() {
    // Create a new chat history with the initial bot message
    this.chatHistory.push([{ sender: 'bot', text: 'How can I assist you?' }]);
    this.activeChatIndex = this.chatHistory.length - 1; // Set the active chat to the new chat
    this.messages = [...this.chatHistory[this.activeChatIndex]]; // Set messages to the new chat
    this.saveChatHistory();
  }

  loadChat(index: number) {
    this.activeChatIndex = index;
    this.messages = [...this.chatHistory[index]];
  }

  deleteChat(index: number) {
    this.chatHistory.splice(index, 1);
    if (this.activeChatIndex === index) {
      this.activeChatIndex = null;
      this.messages = [];
    } else if (this.activeChatIndex !== null && this.activeChatIndex > index) {
      this.activeChatIndex--;
    }
    this.saveChatHistory();
  }

  saveChatHistory() {
    if (this.activeChatIndex !== null) {
      this.chatHistory[this.activeChatIndex] = [...this.messages];
    }
    localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
  }

  loadChatHistory() {
    if (typeof window !== 'undefined' && localStorage) {
      const savedChats = localStorage.getItem('chatHistory');
      if (savedChats) {
        this.chatHistory = JSON.parse(savedChats);
        if (this.chatHistory.length > 0) {
          this.loadChat(0);
        }
      } else {
        this.startNewChat();
      }
    }
  }

}

