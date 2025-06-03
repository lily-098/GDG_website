// This is a mock service to simulate fetching events from an API
export const fetchEvents = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  return [
    {
      id: '1',
      title: 'Google I/O Extended MMMUT 2025',
      description: 'Join us for Google I/O Extended, where we\'ll watch and discuss the keynote and sessions from Google I/O 2025. Network with fellow developers and learn about the latest Google technologies.',
      date: '2025-06-15',
      time: '10:00 AM - 5:00 PM',
      location: 'MMMUT Campus, Gorakhpur',
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'upcoming',
      tags: ['Conference', 'Google I/O', 'Android', 'Web'],
      attendees: 250,
      speakers: [
        {
          name: 'Dr. Aisha Kumar',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          title: 'AI Research Lead, Google'
        },
        {
          name: 'Raj Patel',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          title: 'Senior Android Developer'
        }
      ]
    },
    {
      id: '2',
      title: 'Flutter Forward Workshop',
      description: 'A hands-on workshop exploring the latest features in Flutter. Build cross-platform apps with beautiful UI and smooth animations. Perfect for beginners and experienced developers alike.',
      date: '2025-07-22',
      time: '2:00 PM - 6:00 PM',
      location: 'Tech Hub, MMMUT',
      image: 'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'upcoming',
      tags: ['Workshop', 'Flutter', 'Mobile Development'],
      attendees: 120
    },
    {
      id: '3',
      title: 'Web Dev Bootcamp: Advanced JavaScript',
      description: 'Take your JavaScript skills to the next level with this intensive bootcamp. Learn about modern JS features, frameworks, and best practices for building scalable web applications.',
      date: '2025-08-05',
      time: '9:00 AM - 4:00 PM',
      location: 'Virtual Event',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'upcoming',
      tags: ['Bootcamp', 'JavaScript', 'Web Development'],
      attendees: 180
    },
    {
      id: '4',
      title: 'Machine Learning Study Jam',
      description: 'Join our ML study jam where we\'ll dive into TensorFlow and Google\'s ML tools. This hands-on session will cover basic concepts to practical implementation with real-world datasets.',
      date: '2025-09-18',
      time: '1:00 PM - 5:00 PM',
      location: 'AI Lab, MMMUT',
      image: 'https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'upcoming',
      tags: ['Study Jam', 'Machine Learning', 'TensorFlow'],
      attendees: 90
    },
    {
      id: '5',
      title: 'Firebase Dev Day',
      description: 'A full day dedicated to Firebase and its ecosystem. Learn how to leverage Firebase services to build secure, scalable applications with minimal backend code.',
      date: '2024-11-12',
      time: '10:00 AM - 4:00 PM',
      location: 'MMMUT Auditorium',
      image: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'past',
      tags: ['Conference', 'Firebase', 'Cloud'],
      attendees: 210
    },
    {
      id: '6',
      title: 'Android Dev Summit Recap',
      description: 'Missed Android Dev Summit? Join us for this recap event where we\'ll discuss the key announcements, new features, and best practices shared during the summit.',
      date: '2024-12-05',
      time: '3:00 PM - 6:00 PM',
      location: 'Tech Hub, MMMUT',
      image: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'past',
      tags: ['Meetup', 'Android', 'Mobile Development'],
      attendees: 150
    },
    {
      id: '7',
      title: 'Women Techmakers: Leadership Workshop',
      description: 'A special workshop focusing on leadership skills for women in technology. Join us for inspiring talks, networking, and hands-on activities designed to empower women in tech.',
      date: '2025-01-20',
      time: '1:00 PM - 5:00 PM',
      location: 'MMMUT Innovation Center',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'past',
      tags: ['Workshop', 'Women Techmakers', 'Leadership'],
      attendees: 120
    },
    {
      id: '8',
      title: 'Cloud Next Extended',
      description: 'Experience Google Cloud Next conference highlights locally. We\'ll cover the latest in cloud computing, serverless architecture, and machine learning infrastructure.',
      date: '2025-02-28',
      time: '9:00 AM - 5:00 PM',
      location: 'Virtual Event',
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'past',
      tags: ['Conference', 'Cloud', 'Google Cloud'],
      attendees: 180
    }
  ];
};