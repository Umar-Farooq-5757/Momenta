import architecture from "./architecture.jpeg";
import bookonancientcivilizations from "./bookonancientcivilizations.jpeg";
import cloudcomputing from "./cloudcomputing.jpeg";
import historicalpapers from "./historicalpapers.jpeg";
import labexperiment from "./labexperiment.jpeg";
import marketing from "./marketing.jpeg";
import mixingpaints from "./mixingpaints.jpeg";
import mountains from "./mountains.jpeg";
import nature from "./nature.jpeg";
import oceanview from "./oceanview.jpeg";
import pasta from "./pasta.jpeg";
import piano from "./piano.jpeg";
import planting from "./planting.jpeg";
import sculpture from "./sculpture.jpeg";
import writing from "./writing.jpeg";
import cityevening from "./cityevening.jpeg";

export const dummyUsers = [
  {
    _id: "83498934jjfj782375432",
    username: "Umar Farooq",
    email: "aamirgel17@gmail.com",
    profilePic: "",
    bio: {
      age: 17,
      description: "Full stack web developer | Software engineer",
      location: "Wah Cantt, Pakistan",
    },
    password: "fj8923j54287uw8f7we8ij325i275",
    followers: ["sdjfajk423u4kl23j4k3424"],
    following: ["sdjfajk423u4kl23j4k3424"],
  },
  {
    _id: "sdjfajk423u4kl23j4k3424",
    username: "Hasnain Ali",
    email: "hasnain@gmail.com",
    profilePic: "",
    bio: {
      age: 19,
      description: "Graphic Designer | Video Editor",
      location: "Wah Cantt, Pakistan",
    },
    password: "fjkjfj2304u23jrksdjf87342",
    followers: ["83498934jjfj782375432"],
    following: ["83498934jjfj782375432"],
  },
  {
    _id: "kdlsf9834jdkfj8234lk23",
    username: "Muhammad Rumman",
    email: "muhammadrumman044@gmail.com",
    profilePic: "",
    bio: {
      age: 22,
      description: "Marketing Specialist | Social Media Strategist",
      location: "Mianwali, Pakistan",
    },
    password: "a8v7bx92kfjs73ksj284",
    followers: [],
    following: [],
  },
  {
    _id: "jsdkf9834jdkfj8347sldf",
    username: "Faisal Khan",
    email: "faisalkhan@example.com",
    profilePic: "",
    bio: {
      age: 25,
      description: "Wildlife Conservationist | Documentary Filmmaker",
      location: "Lahore, Pakistan",
    },
    password: "js8923ksj23j4ksj2k3j",
    followers: [],
    following: [],
  },
  {
    _id: "adf23948jsl34jksd8fjs",
    username: "Bilal Ahmed",
    email: "bilalahmed@example.com",
    profilePic: "",
    bio: {
      age: 28,
      description: "Fitness Coach | Nutrition Advisor",
      location: "Islamabad, Pakistan",
    },
    password: "k2j3k4j5k23j4k5j23k4",
    followers: [],
    following: [],
  },
  {
    _id: "qwe8u34lkj4kj23lk4j2",
    username: "Saad Ali",
    email: "saadali@example.com",
    profilePic: "",
    bio: {
      age: 21,
      description: "Contemporary Artist | Illustrator",
      location: "Peshawar, Pakistan",
    },
    password: "3j4k5j23k4j5k34j5k34",
    followers: [],
    following: [],
  },
  {
    _id: "zmxn9834lkj24lkj234ls",
    username: "Imran Sheikh",
    email: "imransheikh@example.com",
    profilePic: "",
    bio: {
      age: 24,
      description: "Mechanical Engineer | Robotics Enthusiast",
      location: "Multan, Pakistan",
    },
    password: "k23j4k5j23k4j5k34j5k",
    followers: [],
    following: [],
  },
  {
    _id: "lkj3498sjdkfjsldkjf92",
    username: "Ahmed Tariq",
    email: "ahmedtariq@example.com",
    profilePic: "",
    bio: {
      age: 26,
      description: "Event Manager | Hospitality Professional",
      location: "Faisalabad, Pakistan",
    },
    password: "9s8df7s8df7s8df7s8df",
    followers: [],
    following: [],
  },
  {
    _id: "poqw9834jksdfj2394lkj",
    username: "Hamza Iqbal",
    email: "hamzaiqbal@example.com",
    profilePic: "",
    bio: {
      age: 20,
      description: "Astrophysics Student | Amateur Astronomer",
      location: "Quetta, Pakistan",
    },
    password: "qweoiur34234lkjasdf",
    followers: [],
    following: [],
  },
  {
    _id: "xlsidjf9323lkj4lkj234",
    username: "Naeem Shafi",
    email: "naeemshafi@example.com",
    profilePic: "",
    bio: {
      age: 23,
      description: "Professional Chef | Culinary Artist",
      location: "Sialkot, Pakistan",
    },
    password: "sdkj4398jsdf0923lkjsd",
    followers: [],
    following: [],
  },
];


export const dummyPosts = [
  
  {
    caption: "Trying a new recipe for homemade pasta. 🍝",
    image: pasta,
    author: "83498934jjfj782375432",
    likes: 48,
    dislikes: 5,
    comments: [
      {
        user: "xlsidjf9323lkj4lkj234",
        text: "Looks delicious! Did it come out well?",
        createdAt: Date.now() - 1000000,
      },
    ],
    createdAt: Date.now() - 3600000,
  },
  {
    caption: "Sketching some architectural designs for a new project. ✍️",
    image: architecture,
    author: "sdjfajk423u4kl23j4k3424",
    likes: 120,
    dislikes: 2,
    comments: [
      {
        user: "kdlsf9834jdkfj8234lk23",
        text: "The details are incredible! Can't wait to see the finished plans.",
        createdAt: Date.now() - 800000,
      },
    ],
    createdAt: Date.now() - 7200000,
  },
  {
    caption: "Working on a new sculpture, focusing on human form. 🎨",
    image: sculpture,
    author: "kdlsf9834jdkfj8234lk23",
    likes: 75,
    dislikes: 0,
    comments: [
      {
        user: "jsdkf9834jdkfj8347sldf",
        text: "The movement and expression are so lifelike. Great work!",
        createdAt: Date.now() - 400000,
      },
    ],
    createdAt: Date.now() - 1800000,
  },
  {
    caption: "A beautiful view of the mountains.",
    image: mountains,
    author: "83498934jjfj782375432",
    likes: 48,
    dislikes: 5,
    comments: [
      {
        user: "xlsidjf9323lkj4lkj234",
        text: "Amazing! I also wanna come here",
        createdAt: Date.now() - 1000000,
      },
    ],
    createdAt: Date.now() - 3600000,
  },
  {
    caption: "A reset with a quick nature hike.",
    image: nature,
    author: "jsdkf9834jdkfj8347sldf",
    likes: 38,
    dislikes: 1,
    comments: [
      {
        user: "adf23948jsl34jksd8fjs",
        text: "Nature is the best debugger.",
        createdAt: Date.now() - 300000,
      },
    ],
    createdAt: Date.now() - 3600000,
  },
  {
    caption: "Analyzing historical documents for my research paper. 📜",
    image: historicalpapers,
    author: "adf23948jsl34jksd8fjs",
    likes: 55,
    dislikes: 3,
    comments: [
      {
        user: "qwe8u34lkj4kj23lk4j2",
        text: "That sounds so interesting. What period are you studying?",
        createdAt: Date.now() - 250000,
      },
    ],
    createdAt: Date.now() - 2700000,
  },
  {
    caption: "Brainstorming a new marketing strategy for a local business. 📈",
    image: marketing,
    author: "qwe8u34lkj4kj23lk4j2",
    likes: 29,
    dislikes: 0,
    comments: [
      {
        user: "zmxn9834lkj24lkj234ls",
        text: "Love seeing the creative process! What's the main goal?",
        createdAt: Date.now() - 150000,
      },
    ],
    createdAt: Date.now() - 2000000,
  },
  {
    caption:
      "Practicing a new piece on the piano, aiming for perfect harmony. 🎹",
    image: piano,
    author: "zmxn9834lkj24lkj234ls",
    likes: 41,
    dislikes: 5,
    comments: [
      {
        user: "lkj3498sjdkfjsldkjf92",
        text: "Sounds beautiful! The practice really shows.",
        createdAt: Date.now() - 180000,
      },
    ],
    createdAt: Date.now() - 2300000,
  },
  {
    caption: "Conducting an experiment in the lab to test a new compound. 🧪",
    image: labexperiment,
    author: "lkj3498sjdkfjsldkjf92",
    likes: 67,
    dislikes: 2,
    comments: [
      {
        user: "poqw9834jksdfj2394lkj",
        text: "Super cool! Hope the results are what you're looking for.",
        createdAt: Date.now() - 220000,
      },
    ],
    createdAt: Date.now() - 2600000,
  },
  {
    caption: "Starting a new book on ancient civilizations. 📚",
    image: bookonancientcivilizations,
    author: "xlsidjf9323lkj4lkj234",
    likes: 77,
    dislikes: 4,
    comments: [
      {
        user: "83498934jjfj782375432",
        text: "That's a great choice! Let me know if you'd recommend it.",
        createdAt: Date.now() - 300000,
      },
    ],
    createdAt: Date.now() - 3200000,
  },
  {
    caption: "Relaxing with some serene ocean views.",
    image: oceanview,
    author: "83498934jjfj782375432",
    likes: 60,
    dislikes: 3,
    comments: [
      {
        user: "sdjfajk423u4kl23j4k3424",
        text: "Such a calming atmosphere!",
        createdAt: Date.now() - 400000,
      },
    ],
    createdAt: Date.now() - 3500000,
  },
  {
    caption: "Planting some new herbs in the garden. 🌱",
    image: planting,
    author: "sdjfajk423u4kl23j4k3424",
    likes: 44,
    dislikes: 0,
    comments: [
      {
        user: "kdlsf9834jdkfj8234lk23",
        text: "Happy planting! Hope they grow big and strong.",
        createdAt: Date.now() - 500000,
      },
    ],
    createdAt: Date.now() - 3700000,
  },
  {
    caption: "Mixing paints for a new landscape painting. 🖌️",
    image: mixingpaints,
    author: "jsdkf9834jdkfj8347sldf",
    likes: 72,
    dislikes: 1,
    comments: [
      {
        user: "zmxn9834lkj24lkj234ls",
        text: "I love the color palette you're using. So vibrant!",
        createdAt: Date.now() - 320000,
      },
    ],
    createdAt: Date.now() - 4000000,
  },
  {
    caption: "Morning writing sessions, capturing some new story ideas. ✍️",
    image: writing,
    author: "kdlsf9834jdkfj8234lk23",
    likes: 45,
    dislikes: 1,
    comments: [
      {
        user: "jsdkf9834jdkfj8347sldf",
        text: "That's the best way to start the day. Hope the words flow!",
        createdAt: Date.now() - 260000,
      },
    ],
    createdAt: Date.now() - 4300000,
  },
  {
    caption: "Cityscape evenings with a hot brew.",
    image: cityevening,
    author: "sdjfajk423u4kl23j4k3424",
    likes: 52,
    dislikes: 0,
    comments: [
      {
        user: "adf23948jsl34jksd8fjs",
        text: "This combo never fails!",
        createdAt: Date.now() - 240000,
      },
    ],
    createdAt: Date.now() - 4400000,
  },
  {
    caption: "Planning on expanding my business",
    image: cloudcomputing,
    author: "jsdkf9834jdkfj8347sldf",
    likes: 52,
    dislikes: 0,
    comments: [
      {
        user: "jsdkf9834jdkfj8347sldf",
        text: "All the best!",
        createdAt: Date.now() - 240000,
      },
    ],
    createdAt: Date.now() - 4400000,
  },
];

 const assets = [
  architecture,
  bookonancientcivilizations,
  cloudcomputing,
  historicalpapers,
  labexperiment,
  marketing,
  mixingpaints,
  mountains,
  nature,
  oceanview,
  pasta,
  piano,
  planting,
  sculpture,
  writing,
  cityevening,
 ]
export default assets