const memoryService = {
  getMemoriesByUserId(userId) {
    const memories = [
      {
        id: 1,
        userId,
        title: 'Capitole',
        description: 'This is the first memory',
        date: '2021-10-01',
        longitude: 1.4437,
        latitude: 43.6043,
        note: 3,
        city: 'Toulouse',
      },
      {
        id: 2,
        userId,
        title: 'Basilique Notre Dame de Fourvière',
        description: 'This is the second memory',
        date: '2021-10-02',
        longitude: 4.8254,
        latitude: 45.7621,
        note: 4,
        city: 'Lyon',
      },
      {
        id: 3,
        userId,
        title: 'Bayonne Cathedral',
        description: 'This is the third memory',
        date: '2021-10-03',
        longitude: -1.4756,
        latitude: 43.4902,
        note: 5,
        city: 'Bayonne',
      },
      {
        id: 4,
        userId,
        title: 'Eiffel Tower',
        description: 'This is the fourth memory',
        date: '2021-10-04',
        longitude: 2.2945,
        latitude: 48.8584,
        note: 2,
        city: 'Paris',
      },
      {
        id: 5,
        userId,
        title: 'Louvre Museum',
        description: 'This is the fifth memory',
        date: '2021-10-05',
        longitude: 2.3376,
        latitude: 48.8606,
        note: 1,
        city: 'Paris',
      },
      {
        id: 6,
        userId,
        title: 'Louvre Museum',
        description: 'This is the fifth memory',
        date: '2021-10-05',
        longitude: 2.3376,
        latitude: 48.8606,
        note: 1,
        city: 'Paris',
      },
    ];
    localStorage.setItem('memoriesData', JSON.stringify({ memories }));
    const memoriesData = JSON.parse(localStorage.getItem('memoriesData')) || { memories: [] };
    return memoriesData.memories.filter((memory) => memory.userId === userId);
  },
  getMemoryById(memoryId) {
    const memoriesData = JSON.parse(localStorage.getItem('memoriesData')) || { memories: [] };
    return memoriesData.memories.find((memory) => memory.id === memoryId);
  },
  addMemory(userId, title, description, date, longitude, latitude, note, city) {
    const memoriesData = JSON.parse(localStorage.getItem('memoriesData')) || { memories: [] };
    const id = memoriesData.memories.length + 1;
    const newMemory = {
      id,
      userId,
      title,
      description,
      date,
      longitude,
      latitude,
      note,
      city,
    };
    memoriesData.memories.push(newMemory);
    localStorage.setItem('memoriesData', JSON.stringify(memoriesData));
    return newMemory;
  },
  getMemoriesForAUserInADate(userId, date) {
    const memoriesData = JSON.parse(localStorage.getItem('memoriesData')) || { memories: [] };
    return memoriesData.memories.filter((memory) => memory.userId === userId && memory.date === date);
  },
  getMemoriesForAUserInADateRange(userId, startDate, endDate) {
    const memoriesData = JSON.parse(localStorage.getItem('memoriesData')) || { memories: [] };
    return memoriesData.memories.filter((memory) => memory.userId === userId && memory.date >= startDate && memory.date <= endDate);
  },
  getMemoriesForAUserInALocation(userId, longitude, latitude) {
    const memoriesData = JSON.parse(localStorage.getItem('memoriesData')) || { memories: [] };
    return memoriesData.memories.filter((memory) => memory.userId === userId && memory.longitude === longitude && memory.latitude === latitude);
  },
  getMemoriesForAUserInALocationRange(userId, longitude, latitude, range) {
    const memoriesData = JSON.parse(localStorage.getItem('memoriesData')) || { memories: [] };
    return memoriesData.memories.filter((memory) => memory.userId === userId && memory.longitude >= longitude - range && memory.longitude <= longitude + range && memory.latitude >= latitude - range && memory.latitude <= latitude + range);
  },
  getMemoriesForAUserWithAValueGreaterThan(userId, value) {
    const memoriesData = JSON.parse(localStorage.getItem('memoriesData')) || { memories: [] };
    return memoriesData.memories.filter((memory) => memory.userId === userId && memory.note > value);
  },
  getMemoriesForAUserWithinACity(userId, city) {
    const memoriesData = JSON.parse(localStorage.getItem('memoriesData')) || { memories: [] };
    return memoriesData.memories.filter((memory) => memory.userId === userId && memory.city === city);
  },
  getCitiesForAUser(userId) {
    const memoriesData = JSON.parse(localStorage.getItem('memoriesData')) || { memories: [] };
    return memoriesData.memories.filter((memory) => memory.userId === userId).map((memory) => memory.city).filter((city, index, cities) => cities.indexOf(city) === index);
  },
};

export default memoryService;
