// Hardcoded water points data for the Emfuleni Water Help platform

export const getWaterPoints = () => {
  return [
    {
      id: 1,
      area: "Vanderbijlpark",
      address: "34 Ramsbottom Street, Vanderbijlpark SE2, Vanderbijlpark, 1911, South Africa",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=400&auto=format",
      availableTimes: ["08:00 - 10:00", "16:00 - 18:00"],
      coordinates: {
        lat: -26.70880,
        lng: 27.84050
      },
      description: "Two-story house with blue roof. Look for the blue gate and 'Water Help' sign."
    },
    {
      id: 2,
      area: "Vanderbijlpark",
      address: "39 President Hoffman Street, Vanderbijlpark SE1, Vanderbijlpark, 1911, South Africa",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400&auto=format",
      availableTimes: ["07:00 - 10:00", "15:00 - 19:00"],
      coordinates: {
        lat: -26.70681,
        lng: 27.83829
      },
      description: "Single-story house with white fence. Borehole water available. Please use the side entrance."
    },
    {
      id: 3,
      area: "Three Rivers",
      address: "123 Nile Drive, Three Rivers, Vereeniging, 1929, South Africa",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=400&auto=format",
      availableTimes: ["07:00 - 09:00", "15:00 - 19:00"],
      coordinates: {
        lat: -26.6790,
        lng: 27.9958
      },
      description: "Single-story house with white walls and brown roof. Borehole tap available on the side of the house."
    },
    {
      id: 4,
      area: "Vereeniging",
      address: "456 Beaconsfield Avenue, Vereeniging Central, 1939, South Africa",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=400&auto=format",
      availableTimes: ["09:00 - 12:00", "14:00 - 17:00"],
      coordinates: {
        lat: -26.6739,
        lng: 27.9258
      },
      description: "Corner house with large garden. Entrance through the side gate with 'Water Available' sign."
    },
    {
      id: 5,
      area: "Bophelong",
      address: "789 Thutsi Street, Bophelong, Vanderbijlpark, 1911, South Africa",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400&auto=format",
      availableTimes: ["10:00 - 14:00"],
      coordinates: {
        lat: -26.7323,
        lng: 27.8066
      },
      description: "Green house with large tree in front. Borehole tap available in the front yard."
    },
    {
      id: 6,
      area: "Sharpeville",
      address: "202 Seeiso Street, Sharpeville, Vereeniging, 1928, South Africa",
      image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=400&auto=format",
      availableTimes: ["07:00 - 10:00", "17:00 - 19:00"],
      coordinates: {
        lat: -26.6883,
        lng: 27.8672
      },
      description: "Yellow house with black roof. Please enter through the main gate and follow the signs."
    },
    {
      id: 7,
      area: "Sebokeng",
      address: "345 Moshoeshoe Street, Sebokeng Zone 10, Vanderbijlpark, 1983, South Africa",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=400&auto=format",
      availableTimes: ["08:00 - 11:00", "16:00 - 18:30"],
      coordinates: {
        lat: -26.5884,
        lng: 27.8401
      },
      description: "Brick house with green roof. Borehole access at the back of the house."
    }
  ];
};