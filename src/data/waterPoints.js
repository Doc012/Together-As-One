/**
 * Mock data for water points across Emfuleni
 * This represents homes with boreholes offering water during the crisis
 */

export const waterPoints = [
  {
    id: "wp1",
    name: "Vanderbijlpark Residence",
    area: "Vanderbijlpark",
    subArea: "Vanderbijlpark SE2",
    address: "34 Ramsbottom Street, Vanderbijlpark SE2",
    description: "Residential home with 5000L storage tank and borehole",
    schedule: [
      { day: "Monday", times: ["08:00 - 10:00", "16:00 - 18:00"] },
      { day: "Wednesday", times: ["08:00 - 10:00", "16:00 - 18:00"] },
      { day: "Friday", times: ["08:00 - 10:00", "16:00 - 18:00"] }
    ],
    availableTimes: ["Mon, Wed, Fri: 08:00-10:00", "Mon, Wed, Fri: 16:00-18:00"],
    availability: [
      { day: 1, startHour: 8, endHour: 10 },
      { day: 1, startHour: 16, endHour: 18 },
      { day: 3, startHour: 8, endHour: 10 },
      { day: 3, startHour: 16, endHour: 18 },
      { day: 5, startHour: 8, endHour: 10 },
      { day: 5, startHour: 16, endHour: 18 }
    ],
    location: {
      latitude: -26.70880,
      longitude: 27.84050
    },
    imageUrl: "https://s.hdnux.com/photos/61/17/31/12908103/4/rawImage.jpg"
  },
  {
    id: "wp2",
    name: "Hoffman Street Water Point",
    area: "Vanderbijlpark",
    subArea: "Vanderbijlpark SE1",
    address: "39 President Hoffman Street, Vanderbijlpark SE1",
    description: "Private residence with water filling station and 10000L JoJo tank",
    schedule: [
      { day: "Tuesday", times: ["07:00 - 09:00", "17:00 - 19:00"] },
      { day: "Thursday", times: ["07:00 - 09:00", "17:00 - 19:00"] },
      { day: "Saturday", times: ["09:00 - 12:00"] }
    ],
    availableTimes: ["Tue, Thu: 07:00-09:00", "Tue, Thu: 17:00-19:00", "Sat: 09:00-12:00"],
    availability: [
      { day: 2, startHour: 7, endHour: 9 },
      { day: 2, startHour: 17, endHour: 19 },
      { day: 4, startHour: 7, endHour: 9 },
      { day: 4, startHour: 17, endHour: 19 },
      { day: 6, startHour: 9, endHour: 12 }
    ],
    location: {
      latitude: -26.71689,
      longitude: 27.84225
    },
    imageUrl: "https://devvlsnxxkrq9.cloudfront.net/prod/assets/Newton-Swansea-5-bedrooms-Beautiful-House.jpg"
  },
  {
    id: "wp3",
    name: "Three Rivers Borehole",
    area: "Vereeniging",
    subArea: "Three Rivers",
    address: "12 Nile Drive, Three Rivers",
    description: "Family home with borehole and multiple taps for quick filling",
    schedule: [
      { day: "Monday", times: ["15:00 - 19:00"] },
      { day: "Wednesday", times: ["15:00 - 19:00"] },
      { day: "Saturday", times: ["08:00 - 12:00"] },
      { day: "Sunday", times: ["08:00 - 12:00"] }
    ],
    availableTimes: ["Mon, Wed: 15:00-19:00", "Sat, Sun: 08:00-12:00"],
    availability: [
      { day: 1, startHour: 15, endHour: 19 },
      { day: 3, startHour: 15, endHour: 19 },
      { day: 6, startHour: 8, endHour: 12 },
      { day: 0, startHour: 8, endHour: 12 }
    ],
    location: {
      latitude: -26.67450,
      longitude: 27.94582
    },
    imageUrl: "https://interiordesign.net/wp-content/uploads/2024/12/Interior-Design-Westchester-Home-Amy-Courtney-Design-RockledgeDrive-29C.jpg"
  },
  {
    id: "wp4",
    name: "Arcon Park Water Station",
    area: "Vereeniging",
    subArea: "Arcon Park",
    address: "7 Platinum Street, Arcon Park",
    description: "Industrial property with high-volume water supply and quick-fill system",
    schedule: [
      { day: "Monday", times: ["06:00 - 18:00"] },
      { day: "Tuesday", times: ["06:00 - 18:00"] },
      { day: "Wednesday", times: ["06:00 - 18:00"] },
      { day: "Thursday", times: ["06:00 - 18:00"] },
      { day: "Friday", times: ["06:00 - 18:00"] }
    ],
    availableTimes: ["Mon-Fri: 06:00-18:00"],
    availability: [
      { day: 1, startHour: 6, endHour: 18 },
      { day: 2, startHour: 6, endHour: 18 },
      { day: 3, startHour: 6, endHour: 18 },
      { day: 4, startHour: 6, endHour: 18 },
      { day: 5, startHour: 6, endHour: 18 }
    ],
    location: {
      latitude: -26.67021,
      longitude: 27.90232
    },
    imageUrl: "https://i.ytimg.com/vi/B56pik49Y5s/maxresdefault.jpg"
  },
  {
    id: "wp5",
    name: "Sasolburg Central Point",
    area: "Sasolburg",
    subArea: "Sasolburg Central",
    address: "23 Kirchoffer Boulevard, Sasolburg",
    description: "Church grounds with multiple water collection points",
    schedule: [
      { day: "Tuesday", times: ["07:00 - 11:00"] },
      { day: "Thursday", times: ["07:00 - 11:00"] },
      { day: "Saturday", times: ["07:00 - 13:00"] }
    ],
    availableTimes: ["Tue, Thu: 07:00-11:00", "Sat: 07:00-13:00"],
    availability: [
      { day: 2, startHour: 7, endHour: 11 },
      { day: 4, startHour: 7, endHour: 11 },
      { day: 6, startHour: 7, endHour: 13 }
    ],
    location: {
      latitude: -26.81514,
      longitude: 27.83196
    },
    imageUrl: "https://images.homes.com/listings/215/6773596034-060057691/2029-garrett-farms-row-shreveport-la-primaryphoto.jpg"
  },
  {
    id: "wp6",
    name: "Vaalpark Residence",
    area: "Sasolburg",
    subArea: "Vaalpark",
    address: "45 Brahms Street, Vaalpark",
    description: "Private home with 7500L water storage and multiple taps",
    schedule: [
      { day: "Monday", times: ["17:00 - 19:00"] },
      { day: "Wednesday", times: ["17:00 - 19:00"] },
      { day: "Friday", times: ["17:00 - 19:00"] },
      { day: "Sunday", times: ["10:00 - 13:00"] }
    ],
    availableTimes: ["Mon, Wed, Fri: 17:00-19:00", "Sun: 10:00-13:00"],
    availability: [
      { day: 1, startHour: 17, endHour: 19 },
      { day: 3, startHour: 17, endHour: 19 },
      { day: 5, startHour: 17, endHour: 19 },
      { day: 0, startHour: 10, endHour: 13 }
    ],
    location: {
      latitude: -26.78967,
      longitude: 27.84392
    },
    imageUrl: "https://static.schumacherhomes.com/umbraco/media/wvflutbh/image4.jpg?format=webp"
  },
  {
    id: "wp7",
    name: "Evaton Community Center",
    area: "Evaton",
    subArea: "Evaton North",
    address: "1242 Golden Highway, Evaton North",
    description: "Community center with water distribution facility",
    schedule: [
      { day: "Monday", times: ["08:00 - 16:00"] },
      { day: "Tuesday", times: ["08:00 - 16:00"] },
      { day: "Wednesday", times: ["08:00 - 16:00"] },
      { day: "Thursday", times: ["08:00 - 16:00"] },
      { day: "Friday", times: ["08:00 - 16:00"] }
    ],
    availableTimes: ["Mon-Fri: 08:00-16:00"],
    availability: [
      { day: 1, startHour: 8, endHour: 16 },
      { day: 2, startHour: 8, endHour: 16 },
      { day: 3, startHour: 8, endHour: 16 },
      { day: 4, startHour: 8, endHour: 16 },
      { day: 5, startHour: 8, endHour: 16 }
    ],
    location: {
      latitude: -26.52789,
      longitude: 27.85409
    },
    imageUrl: "https://static3.mansionglobal.com/production/media/article-images/19b5fd6a46cc3c644b5e0b2f3e87260c/large_3157-Batis-Cres-Waterfall-Country-Est-Midrand-Corlia-Jawitz-Midrand-S36-32.jpg"
  },
  {
    id: "wp8",
    name: "Evaton West Relief Point",
    area: "Evaton",
    subArea: "Evaton West",
    address: "3580 Moshoeshoe Street, Evaton West",
    description: "School grounds converted to water distribution center",
    schedule: [
      { day: "Tuesday", times: ["10:00 - 15:00"] },
      { day: "Thursday", times: ["10:00 - 15:00"] },
      { day: "Saturday", times: ["09:00 - 14:00"] }
    ],
    availableTimes: ["Tue, Thu: 10:00-15:00", "Sat: 09:00-14:00"],
    availability: [
      { day: 2, startHour: 10, endHour: 15 },
      { day: 4, startHour: 10, endHour: 15 },
      { day: 6, startHour: 9, endHour: 14 }
    ],
    location: {
      latitude: -26.54321,
      longitude: 27.83451
    },
    imageUrl: "https://images.adsttc.com/media/images/5efe/1f7f/b357/6540/5400/01d7/newsletter/archdaily-houses-104.jpg?1593712501"
  },
  {
    id: "wp9",
    name: "Zone 6 Water Station",
    area: "Sebokeng",
    subArea: "Zone 6",
    address: "16453 Vilakazi Street, Sebokeng Zone 6",
    description: "Local business providing free water from private borehole",
    schedule: [
      { day: "Monday", times: ["07:00 - 09:00", "16:00 - 18:00"] },
      { day: "Wednesday", times: ["07:00 - 09:00", "16:00 - 18:00"] },
      { day: "Friday", times: ["07:00 - 09:00", "16:00 - 18:00"] }
    ],
    availableTimes: ["Mon, Wed, Fri: 07:00-09:00", "Mon, Wed, Fri: 16:00-18:00"],
    availability: [
      { day: 1, startHour: 7, endHour: 9 },
      { day: 1, startHour: 16, endHour: 18 },
      { day: 3, startHour: 7, endHour: 9 },
      { day: 3, startHour: 16, endHour: 18 },
      { day: 5, startHour: 7, endHour: 9 },
      { day: 5, startHour: 16, endHour: 18 }
    ],
    location: {
      latitude: -26.56782,
      longitude: 27.84213
    },
    imageUrl: "https://images.pamgolding.co.za/content/properties/202404/319239/h/319239_h_181.jpg?w=600&quality=75"
  },
  {
    id: "wp10",
    name: "Zone 12 Community Point",
    area: "Sebokeng",
    subArea: "Zone 12",
    address: "10234 Mopeli Street, Sebokeng Zone 12",
    description: "Community hall with multiple water tanks and covered waiting area",
    schedule: [
      { day: "Tuesday", times: ["09:00 - 14:00"] },
      { day: "Thursday", times: ["09:00 - 14:00"] },
      { day: "Saturday", times: ["08:00 - 15:00"] },
      { day: "Sunday", times: ["10:00 - 13:00"] }
    ],
    availableTimes: ["Tue, Thu: 09:00-14:00", "Sat: 08:00-15:00", "Sun: 10:00-13:00"],
    availability: [
      { day: 2, startHour: 9, endHour: 14 },
      { day: 4, startHour: 9, endHour: 14 },
      { day: 6, startHour: 8, endHour: 15 },
      { day: 0, startHour: 10, endHour: 13 }
    ],
    location: {
      latitude: -26.55432,
      longitude: 27.85631
    },
    imageUrl: "https://hips.hearstapps.com/hmg-prod/images/imagereader-3-1550604185.jpg?crop=0.8883333333333333xw:1xh;center,top&resize=1200:*"
  },
  {
    id: "wp11",
    name: "Duncanville Residence",
    area: "Vereeniging",
    subArea: "Duncanville",
    address: "7 Scott Street, Duncanville",
    description: "Private home with large borehole system and multiple filling points",
    schedule: [
      { day: "Monday", times: ["07:30 - 10:30"] },
      { day: "Wednesday", times: ["07:30 - 10:30"] },
      { day: "Friday", times: ["07:30 - 10:30"] },
      { day: "Saturday", times: ["14:00 - 17:00"] }
    ],
    availableTimes: ["Mon, Wed, Fri: 07:30-10:30", "Sat: 14:00-17:00"],
    availability: [
      { day: 1, startHour: 7, endHour: 11 },
      { day: 3, startHour: 7, endHour: 11 },
      { day: 5, startHour: 7, endHour: 11 },
      { day: 6, startHour: 14, endHour: 17 }
    ],
    location: {
      latitude: -26.65723,
      longitude: 27.92134
    },
    imageUrl: "https://everythingproperty.co.za/wp-content/uploads/2024/03/House-Zai-Constantia-Seeff-1-scaled.jpg"
  },
  {
    id: "wp12",
    name: "Peacehaven School",
    area: "Vereeniging",
    subArea: "Peacehaven",
    address: "22 Jan Hofmeyr Road, Peacehaven",
    description: "School premises offering water from multiple boreholes",
    schedule: [
      { day: "Monday", times: ["14:00 - 18:00"] },
      { day: "Wednesday", times: ["14:00 - 18:00"] },
      { day: "Friday", times: ["14:00 - 18:00"] },
      { day: "Saturday", times: ["09:00 - 13:00"] }
    ],
    availableTimes: ["Mon, Wed, Fri: 14:00-18:00", "Sat: 09:00-13:00"],
    availability: [
      { day: 1, startHour: 14, endHour: 18 },
      { day: 3, startHour: 14, endHour: 18 },
      { day: 5, startHour: 14, endHour: 18 },
      { day: 6, startHour: 9, endHour: 13 }
    ],
    location: {
      latitude: -26.63124,
      longitude: 27.95831
    },
    imageUrl: "https://media.istockphoto.com/id/147205632/photo/modern-home-with-swimming-pool.jpg?s=612x612&w=0&k=20&c=sxRQ398SxAjC4FrRombjl46oDGJVdy23T7i3RXO-mww="
  },
  {
    id: "wp13",
    name: "Vanderbijlpark CW Filling Station",
    area: "Vanderbijlpark",
    subArea: "Vanderbijlpark CW",
    address: "17 Edison Boulevard, Vanderbijlpark CW",
    description: "Service station with dedicated water distribution system",
    schedule: [
      { day: "Monday", times: ["06:00 - 20:00"] },
      { day: "Tuesday", times: ["06:00 - 20:00"] },
      { day: "Wednesday", times: ["06:00 - 20:00"] },
      { day: "Thursday", times: ["06:00 - 20:00"] },
      { day: "Friday", times: ["06:00 - 20:00"] },
      { day: "Saturday", times: ["07:00 - 19:00"] },
      { day: "Sunday", times: ["08:00 - 18:00"] }
    ],
    availableTimes: ["Mon-Fri: 06:00-20:00", "Sat: 07:00-19:00", "Sun: 08:00-18:00"],
    availability: [
      { day: 1, startHour: 6, endHour: 20 },
      { day: 2, startHour: 6, endHour: 20 },
      { day: 3, startHour: 6, endHour: 20 },
      { day: 4, startHour: 6, endHour: 20 },
      { day: 5, startHour: 6, endHour: 20 },
      { day: 6, startHour: 7, endHour: 19 },
      { day: 0, startHour: 8, endHour: 18 }
    ],
    location: {
      latitude: -26.69532,
      longitude: 27.81976
    },
    imageUrl: "https://img.jamesedition.com/listing_images/2025/03/26/13/53/50/a799feb3-fd1b-4aa8-bdb9-503f1c1d30ea/je/760x470xc.jpg"
  },
  {
    id: "wp14",
    name: "Roodia Water Point",
    area: "Sasolburg",
    subArea: "Roodia",
    address: "5 Riethaan Street, Roodia",
    description: "Private residence with high-output borehole system",
    schedule: [
      { day: "Tuesday", times: ["16:00 - 19:00"] },
      { day: "Thursday", times: ["16:00 - 19:00"] },
      { day: "Saturday", times: ["08:00 - 11:00", "15:00 - 18:00"] }
    ],
    availableTimes: ["Tue, Thu: 16:00-19:00", "Sat: 08:00-11:00, 15:00-18:00"],
    availability: [
      { day: 2, startHour: 16, endHour: 19 },
      { day: 4, startHour: 16, endHour: 19 },
      { day: 6, startHour: 8, endHour: 11 },
      { day: 6, startHour: 15, endHour: 18 }
    ],
    location: {
      latitude: -26.82459,
      longitude: 27.84613
    },
    imageUrl: "https://img.jamesedition.com/listing_images/2025/04/04/11/23/59/f32955d8-3618-4731-8095-35f4e62b4681/je/760x470xc.jpg"
  },
  {
    id: "wp15",
    name: "Zone 14 Community Borehole",
    area: "Sebokeng",
    subArea: "Zone 14",
    address: "1375 Moshoeshoe Road, Sebokeng Zone 14",
    description: "Community initiative providing water from shared borehole",
    schedule: [
      { day: "Monday", times: ["07:00 - 12:00"] },
      { day: "Wednesday", times: ["07:00 - 12:00"] },
      { day: "Friday", times: ["07:00 - 12:00"] },
      { day: "Sunday", times: ["14:00 - 17:00"] }
    ],
    availableTimes: ["Mon, Wed, Fri: 07:00-12:00", "Sun: 14:00-17:00"],
    availability: [
      { day: 1, startHour: 7, endHour: 12 },
      { day: 3, startHour: 7, endHour: 12 },
      { day: 5, startHour: 7, endHour: 12 },
      { day: 0, startHour: 14, endHour: 17 }
    ],
    location: {
      latitude: -26.57861,
      longitude: 27.85932
    },
    imageUrl: "https://webberstudio.com/wp-content/uploads/2023/02/Stunning-House-Design.jpg"
  }
];

/**
 * Function to get all available water points
 * In a real app, this would likely fetch from an API
 */
export const getAvailableWaterPoints = () => {
  return waterPoints;
};

/**
 * Function to get a specific water point by ID
 */
export const getWaterPointById = (id) => {
  return waterPoints.find(point => point.id === id);
};

/**
 * Function to get water points by area
 */
export const getWaterPointsByArea = (area) => {
  return waterPoints.filter(point => point.area === area);
};

/**
 * Function to get currently available water points based on current time
 */
export const getCurrentlyAvailablePoints = () => {
  const now = new Date();
  const currentDay = now.getDay(); // 0-6, where 0 is Sunday
  const currentHour = now.getHours();
  
  return waterPoints.filter(point => {
    return point.availability.some(slot => 
      slot.day === currentDay && 
      currentHour >= slot.startHour && 
      currentHour < slot.endHour
    );
  });
};