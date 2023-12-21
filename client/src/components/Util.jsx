const dep = {
  CSE: "Computer Science",
  ECE: "Electrical and Communication Engineering",
  EEE: "Electrical and Electronics Engineering",
  CE: "Civil Engineering",
  ME: "Mechanical Engineering",
};

const baseURL = "http://localhost:3000/api/";

const logdata = localStorage.getItem("role");

const form = [
  {
    category: "National Initatives Participation",
    data: [
      {
        activity_name: "NCC",
      },
      {
        activity_name: "NSS",
      },
    ],
  },
  {
    category: "Sports & Games Participation",
    data: [
      {
        activity_name: "Sports",
        levels: [
          "Level I - College Events",
          "Level II - Zonal Events",
          "Level III - State/ University Events",
          "Level IV - National Events",
          "Level V - International Events",
        ],
      },
      {
        activity_name: "Games - First",
        levels: [
          "Level I - College Events",
          "Level II - Zonal Events",
          "Level III - State/ University Events",
          "Level IV - National Events",
          "Level V - International Events",
        ],
      },
      {
        activity_name: "Games - Second",
        levels: [
          "Level I - College Events",
          "Level II - Zonal Events",
          "Level III - State/ University Events",
          "Level IV - National Events",
          "Level V - International Events",
        ],
      },
      {
        activity_name: "Games - Thrid",
        levels: [
          "Level I - College Events",
          "Level II - Zonal Events",
          "Level III - State/ University Events",
          "Level IV - National Events",
          "Level V - International Events",
        ],
      },
    ],
  },
  {
    category: "Sports & Games Participation",
    data: [
      {
        activity_name: "Music",
        levels: [
          "Level I - College Events",
          "Level II - Zonal Events",
          "Level III - State/ University Events",
          "Level IV - National Events",
          "Level V - International Events",
        ],
      },
      {
        activity_name: "Performing Arts",
        levels: [
          "Level I - College Events",
          "Level II - Zonal Events",
          "Level III - State/ University Events",
          "Level IV - National Events",
          "Level V - International Events",
        ],
      },
      {
        activity_name: "Literary arts - First",
        levels: [
          "Level I - College Events",
          "Level II - Zonal Events",
          "Level III - State/ University Events",
          "Level IV - National Events",
          "Level V - International Events",
        ],
      },
      {
        activity_name: "Literary arts - Second",
        levels: [
          "Level I - College Events",
          "Level II - Zonal Events",
          "Level III - State/ University Events",
          "Level IV - National Events",
          "Level V - International Events",
        ],
      },
      {
        activity_name: "Literary arts - Third",
        levels: [
          "Level I - College Events",
          "Level II - Zonal Events",
          "Level III - State/ University Events",
          "Level IV - National Events",
          "Level V - International Events",
        ],
      },
    ],
  },
  {
    category: "Professional Self Initiatives",
    data: [
      {
        activity_name: "Tech Fest",
        levels: [
          "Level I - College Events",
          "Level II - Zonal Events",
          "Level III - State/ University Events",
          "Level IV - National Events",
          "Level V - International Events",
        ],
      },
      {
        activity_name: "Mooc Courses",
      },
      {
        activity_name: "Competitions conducted by professional bodies",
        levels: [
          "Level I - College Events",
          "Level II - Zonal Events",
          "Level III - State/ University Events",
          "Level IV - National Events",
          "Level V - International Events",
        ],
      },
      {
        activity_name: "Conference @ IITs,NITS",
      },
      {
        activity_name: "Conference @ KTU",
      },
      {
        activity_name: "Paper presentation @ IITs",
      },
      {
        activity_name: "Paper presentation @ KTU",
      },
      {
        activity_name: "Poster presentation @ IITs,NITs",
      },
      {
        activity_name: "Poster presentation @ KTU",
      },
      {
        activity_name: "Intership",
      },
      {
        activity_name: "IV",
      },
      {
        activity_name: "IELTS",
      },
    ],
  },
  {
    category: "Entrepreneurship and Innovation",
    data: [
      {
        activity_name: "StartUp",
      },
      {
        activity_name: "Patent Filed",
      },
      {
        activity_name: "Patent Published",
      },
      {
        activity_name: "Patent Approved",
      },
      {
        activity_name: "Patent Liscensed",
      },
      {
        activity_name: "Prototype",
      },
      {
        activity_name: "Approval of products",
      },
      {
        activity_name: "Innovation Tech",
      },
      {
        activity_name: "Got venture capital",
      },
      {
        activity_name: "Startup Employement",
      },
      {
        activity_name: "Social Innovation",
      },
    ],
  },
  {
    category: "Leadership & Management",
    data: [
      {
        activity_name: "Student Professional Societies",
        positions: ["Core coordinator", "Sub coordinator", "Volunteer"],
      },
      {
        activity_name: "College Association Chapter",
        positions: ["Core coordinator", "Sub coordinator", "Volunteer"],
      },
      {
        activity_name: "Festival & Technical Events",
        positions: ["Core coordinator", "Sub coordinator", "Volunteer"],
      },
      {
        activity_name: "Hobby Clubs",
        positions: ["Core coordinator", "Sub coordinator", "Volunteer"],
      },
      {
        activity_name: "Elected student representatives",
        positions: ["Core coordinator", "Sub coordinator", "Volunteer"],
      },
    ],
  },
];

export { baseURL ,dep,logdata,form};