// Mock database of users with their personal information and data
export const mockUserData = [
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "555-123-4567",
      email: "sarah.j@example.com",
      age: 34,
      occupation: "Marketing Manager",
      interests: ["yoga", "meditation", "hiking"],
      healthData: {
        stressLevel: "moderate",
        sleepHours: 6.5,
        exerciseFrequency: "2-3 times per week",
        recentConcerns: [
          "Work-related stress",
          "Difficulty falling asleep",
          "Anxiety about public speaking"
        ]
      },
      notes: "Sarah has been experiencing increased work stress due to an upcoming product launch. She's been practicing meditation but struggling to maintain consistency. She's interested in developing better coping mechanisms for work pressure and improving her sleep quality.",
      previousSessions: [
        {
          date: "2024-03-01",
          topics: ["Work stress", "Sleep issues"],
          recommendations: ["Progressive muscle relaxation", "Screen time reduction before bed"]
        },
        {
          date: "2024-03-15",
          topics: ["Anxiety management", "Public speaking"],
          recommendations: ["Breathing exercises", "Visualization techniques"]
        }
      ]
    },
    {
      id: 2,
      name: "David Chen",
      phone: "555-987-6543",
      email: "d.chen@example.com",
      age: 28,
      occupation: "Software Developer",
      interests: ["running", "technology", "gaming"],
      healthData: {
        stressLevel: "high",
        sleepHours: 5.5,
        exerciseFrequency: "1-2 times per week",
        recentConcerns: [
          "Burnout symptoms",
          "Poor work-life balance",
          "Social isolation"
        ]
      },
      notes: "David has been working long hours on a critical project for the past three months. He reports feeling constantly exhausted and has reduced his usual running routine. He's looking for strategies to prevent burnout while still meeting his work commitments.",
      previousSessions: [
        {
          date: "2024-02-10",
          topics: ["Work-life balance", "Burnout prevention"],
          recommendations: ["Setting firm boundaries", "Scheduled breaks"]
        },
        {
          date: "2024-03-05",
          topics: ["Social connection", "Physical activity"],
          recommendations: ["Social scheduling", "Short exercise breaks"]
        }
      ]
    },
    {
      id: 3,
      name: "Maya Patel",
      phone: "555-456-7890",
      email: "maya.p@example.com",
      age: 42,
      occupation: "Physician",
      interests: ["cooking", "gardening", "reading"],
      healthData: {
        stressLevel: "very high",
        sleepHours: 5,
        exerciseFrequency: "rarely",
        recentConcerns: [
          "Compassion fatigue",
          "Irregular eating patterns",
          "Reduced enjoyment in hobbies"
        ]
      },
      notes: "Maya is a healthcare provider who has been dealing with significant workplace stress. She reports difficulty finding time for self-care and has neglected her usual hobbies. She's concerned about compassion fatigue affecting both her professional and personal life.",
      previousSessions: [
        {
          date: "2024-02-20",
          topics: ["Compassion fatigue", "Self-care"],
          recommendations: ["Mindfulness practice", "Scheduled hobby time"]
        },
        {
          date: "2024-03-10",
          topics: ["Nutrition", "Energy management"],
          recommendations: ["Meal planning", "Energy audit exercise"]
        }
      ]
    },
    {
      id: 4,
      name: "James Wilson",
      phone: "555-789-0123",
      email: "j.wilson@example.com",
      age: 23,
      occupation: "Graduate Student",
      interests: ["basketball", "music production", "travel"],
      healthData: {
        stressLevel: "moderate",
        sleepHours: 7,
        exerciseFrequency: "3-4 times per week",
        recentConcerns: [
          "Academic pressure",
          "Financial stress",
          "Career uncertainty"
        ]
      },
      notes: "James is balancing graduate studies with part-time work. He maintains regular exercise but reports increasing worry about future career prospects and student loan debt. He's seeking strategies to manage academic stress and make decisions about post-graduation plans.",
      previousSessions: [
        {
          date: "2024-01-15",
          topics: ["Academic stress", "Time management"],
          recommendations: ["Pomodoro technique", "Weekly planning ritual"]
        },
        {
          date: "2024-02-25",
          topics: ["Career planning", "Financial stress"],
          recommendations: ["Values clarification exercise", "Budget review"]
        }
      ]
    },
    {
      id: 5,
      name: "Test User",
      phone: "123-456-7890",
      email: "test@example.com",
      age: 30,
      occupation: "Test Account",
      interests: ["testing", "development", "chatbots"],
      healthData: {
        stressLevel: "low",
        sleepHours: 8,
        exerciseFrequency: "daily",
        recentConcerns: [
          "Testing various features",
          "Evaluating response quality"
        ]
      },
      notes: "This is a test account for development purposes. Use this account to test the authentication and personalization features of the chatbot.",
      previousSessions: [
        {
          date: "2024-03-20",
          topics: ["Feature testing", "Response evaluation"],
          recommendations: ["Continue testing", "Document findings"]
        }
      ]
    }
  ];
  
  // Function to verify a user based on name and phone number
  export const verifyUser = (name, phone) => {
    const user = mockUserData.find(user => 
      user.name.toLowerCase() === name.toLowerCase() && 
      user.phone === phone
    );
    
    return user || null;
  };
  
  // Function to get a user's data summary for the AI
  export const getUserSummary = (user) => {
    if (!user) return "";
    
    return `
  User Information:
  Name: ${user.name}
  Age: ${user.age}
  Occupation: ${user.occupation}
  Interests: ${user.interests.join(', ')}
  
  Health Data:
  Stress Level: ${user.healthData.stressLevel}
  Sleep: ${user.healthData.sleepHours} hours per night
  Exercise: ${user.healthData.exerciseFrequency}
  Recent Concerns: ${user.healthData.recentConcerns.join(', ')}
  
  Clinical Notes:
  ${user.notes}
  
  Previous Sessions:
  ${user.previousSessions.map(session => 
    `Date: ${session.date}
     Topics: ${session.topics.join(', ')}
     Recommendations: ${session.recommendations.join(', ')}`
  ).join('\n')}
  `;
  };