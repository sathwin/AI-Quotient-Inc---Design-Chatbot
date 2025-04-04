import OpenAI from 'openai';
import { getUserSummary } from '../data/mockUserData';

// Try to use environment variable, otherwise use a flag for fallback
const USE_OPENAI_API = true; // Set to true when you have a valid API key
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Initialize the OpenAI client if we have an API key
let openai = null;
if (USE_OPENAI_API && API_KEY) {
  openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true // Only use this for development
  });
}

// Function to get a response from the OpenAI API or a fallback
export const getAIResponse = async (userMessage, conversationHistory, authenticatedUser = null) => {
  // If we have the OpenAI client initialized, use it
  if (USE_OPENAI_API && openai) {
    try {
      // Format the conversation history for the API
      const messages = formatConversationHistory(conversationHistory, authenticatedUser);
      
      // Add the user's message to the conversation
      messages.push({
        role: 'user',
        content: userMessage
      });
      
      // Call the API
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      });
      
      // Return the response
      return {
        text: completion.choices[0].message.content,
        status: 'success'
      };
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return {
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        status: 'error'
      };
    }
  } else {
    // Fallback to mock responses for testing
    console.log('Using fallback responses (no API key)');
    return getMockResponse(userMessage, authenticatedUser);
  }
};

// Helper function to format the conversation history for the API
const formatConversationHistory = (messagesArray, authenticatedUser) => {
  // Get user data summary if authenticated
  const userDataSummary = authenticatedUser ? getUserSummary(authenticatedUser) : "";
  
  // Start with system message to guide the AI's responses
  const systemMessage = `You are a mental health assistant chatbot. 
Provide supportive, empathetic responses. 
Never claim to be a replacement for professional help. 
Always encourage users to seek professional help for serious concerns. 
For emergencies, recommend calling crisis services like 988 in the US.

${authenticatedUser ? 
  `You are interacting with ${authenticatedUser.name}. 
Here is their information which you should use to provide personalized support:

${userDataSummary}

Use this information to provide personalized responses, but do not explicitly mention that you have all this data about them. Instead, incorporate your knowledge subtly into your responses.` 
  : 
  "You are interacting with an unauthenticated user."
}`;

  const formattedMessages = [
    {
      role: 'system',
      content: systemMessage
    }
  ];
  
  // Add the last few messages from the conversation history (limit to last 10 for context)
  const recentMessages = messagesArray.slice(-10);
  
  recentMessages.forEach(msg => {
    formattedMessages.push({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    });
  });
  
  return formattedMessages;
};

// Mock responses for testing when API key is not available
const getMockResponse = (userMessage, authenticatedUser) => {
  const message = userMessage.toLowerCase();
  let response = "Thank you for sharing. How else can I support you today?";
  let status = 'success';
  
  // Personalize response if we have user data
  if (authenticatedUser) {
    const userFirstName = authenticatedUser.name.split(' ')[0];
    
    // Check for keywords and provide appropriate personalized responses
    if (message.includes('hello') || message.includes('hi ') || message.includes('hey')) {
      response = `Hello ${userFirstName}! It's good to see you again. I see that recently you've been interested in ${authenticatedUser.interests[0]}. How has that been going for you?`;
    } else if (message.includes('stress') || message.includes('stressed')) {
      response = `I understand managing ${authenticatedUser.healthData.stressLevel} stress levels with your busy schedule as a ${authenticatedUser.occupation} can be challenging. Would you like to revisit the ${authenticatedUser.previousSessions[0].recommendations[0]} technique we discussed last time?`;
    } else if (message.includes('sleep') || message.includes('insomnia')) {
      response = `Getting quality sleep can be difficult, especially when you're averaging ${authenticatedUser.healthData.sleepHours} hours. Have you been able to implement any of the sleep hygiene practices we discussed in our previous session?`;
    } else if (message.includes('exercise') || message.includes('workout')) {
      response = `You mentioned previously that you exercise ${authenticatedUser.healthData.exerciseFrequency}. Would you like to talk about ways to incorporate more movement into your daily routine as a ${authenticatedUser.occupation}?`;
    } else if (message.includes('feel')) {
      response = `Thank you for sharing how you're feeling. I know that managing ${authenticatedUser.healthData.recentConcerns[0].toLowerCase()} has been challenging for you. Would you like to explore some new coping strategies today?`;
    } else {
      // Generic personalized response
      response = `I appreciate you sharing that, ${userFirstName}. Considering your interest in ${authenticatedUser.interests.join(' and ')}, and your current focus on managing ${authenticatedUser.healthData.recentConcerns[0].toLowerCase()}, what specifically can I help you with today?`;
    }
  } else {
    // Non-personalized responses for unauthenticated users
    if (message.includes('hello') || message.includes('hi ') || message.includes('hey')) {
      response = "Hello! I'm your mental health assistant. How are you feeling today? I'm here to help you schedule appointments, provide coping strategies, or just listen if you need someone to talk to.";
    } else if (message.includes('anxious') || message.includes('anxiety')) {
      response = "I'm sorry to hear you're feeling anxious. Anxiety is a common experience, and there are several strategies that might help. Would you like to try a breathing exercise, schedule an appointment with a therapist, or learn about grounding techniques?";
    } else if (message.includes('stress') || message.includes('stressed')) {
      response = "I understand that stress can be challenging. Would you like to try a quick stress relief activity, learn about stress management techniques, or schedule an appointment to discuss your stress with a professional?";
    } else if (message.includes('sleep') || message.includes('insomnia')) {
      response = "Sleep difficulties can be frustrating. Would you like some tips for better sleep hygiene, a guided sleep meditation, or to schedule an appointment with a sleep specialist?";
    } else if (message.includes('sad') || message.includes('depressed') || message.includes('depression')) {
      response = "I'm sorry you're feeling this way. It's important to take these feelings seriously. Would you like to talk more about what you're experiencing, try some mood-lifting activities, or connect with a mental health professional?";
      status = 'warning';
    } else if (message.includes('emergency') || message.includes('crisis') || message.includes('suicidal')) {
      response = "If you're experiencing a mental health emergency or having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to reach the Crisis Text Line. These services are available 24/7.";
      status = 'error';
    }
  }
  
  return {
    text: response,
    status: status
  };
};