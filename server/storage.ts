import { 
  contacts, 
  communityMessages, 
  feedback,
  type Contact, 
  type InsertContact,
  type CommunityMessage,
  type InsertCommunityMessage,
  type Feedback,
  type InsertFeedback
} from "@shared/schema";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  
  createCommunityMessage(message: InsertCommunityMessage): Promise<CommunityMessage>;
  getCommunityMessages(): Promise<CommunityMessage[]>;
  
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getFeedbacks(): Promise<Feedback[]>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private communityMessages: Map<number, CommunityMessage>;
  private feedbacks: Map<number, Feedback>;
  private currentContactId: number;
  private currentMessageId: number;
  private currentFeedbackId: number;

  constructor() {
    this.contacts = new Map();
    this.communityMessages = new Map();
    this.feedbacks = new Map();
    this.currentContactId = 1;
    this.currentMessageId = 1;
    this.currentFeedbackId = 1;
    
    // Add some sample community messages
    this.addSampleData();
  }

  private addSampleData() {
    const sampleMessages = [
      {
        name: "Alex Rodriguez",
        message: "Great portfolio! Really impressed with your projects. The cab booking system looks particularly interesting.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      {
        name: "Sarah Chen", 
        message: "Your health bot project caught my attention. Machine learning in healthcare is fascinating! Would love to know more about the datasets you used.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b002?w=40&h=40&fit=crop&crop=face"
      },
      {
        name: "Michael Thompson",
        message: "Nice work on the ReactJS projects! The inventory management system must have been quite challenging. Keep up the great work!",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
      },
      {
        name: "Priya Sharma",
        message: "Congratulations on completing the Zoho Young Creator Program! That's a fantastic achievement. Your skills are really well-rounded.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
      }
    ];

    sampleMessages.forEach(msg => {
      const message: CommunityMessage = {
        name: msg.name,
        message: msg.message,
        avatar: msg.avatar,
        id: this.currentMessageId++,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      };
      this.communityMessages.set(message.id, message);
    });
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createCommunityMessage(insertMessage: InsertCommunityMessage): Promise<CommunityMessage> {
    const id = this.currentMessageId++;
    const message: CommunityMessage = {
      name: insertMessage.name,
      message: insertMessage.message,
      avatar: insertMessage.avatar || null,
      id,
      createdAt: new Date(),
    };
    this.communityMessages.set(id, message);
    return message;
  }

  async getCommunityMessages(): Promise<CommunityMessage[]> {
    return Array.from(this.communityMessages.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = this.currentFeedbackId++;
    const feedbackItem: Feedback = {
      ...insertFeedback,
      id,
      createdAt: new Date(),
    };
    this.feedbacks.set(id, feedbackItem);
    return feedbackItem;
  }

  async getFeedbacks(): Promise<Feedback[]> {
    return Array.from(this.feedbacks.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
