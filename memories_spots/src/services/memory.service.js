const fs = require('fs');
const path = require('path');

const memoryFilePath = path.join(__dirname, '../data/memory.data.json');

const memoryService = {
  getMemoriesByUserId(userId) {
    try {
      const memoriesData = JSON.parse(fs.readFileSync(memoryFilePath, 'utf8'));
      return memoriesData.memories.filter((memory) => memory.userId === userId);
    } catch (error) {
      console.error('Error reading memories JSON file:', error);
      return [];
    }
  },
  getMemoryById(memoryId) {
    try {
      const memoriesData = JSON.parse(fs.readFileSync(memoryFilePath, 'utf8'));
      return memoriesData.memories.find((memory) => memory.id === memoryId);
    } catch (error) {
      console.error('Error reading memories JSON file:', error);
      return null;
    }
  },
  addMemory(userId, title, description, date, longitude, latitude) {
    try {
      const memoriesData = JSON.parse(fs.readFileSync(memoryFilePath, 'utf8'));
      const id = memoriesData.memories.length + 1;
      const newMemory = {
        id,
        userId,
        title,
        description,
        date,
        longitude,
        latitude,
      };
      memoriesData.memories.push(newMemory);
      fs.writeFileSync(memoryFilePath, JSON.stringify(memoriesData, null, 2), 'utf8');
      return newMemory;
    } catch (error) {
      console.error('Error reading or writing memories JSON file:', error);
      return null;
    }
  },
  getMemoriesForAUserInADate(userId, date) {
    try {
      const memoriesData = JSON.parse(fs.readFileSync(memoryFilePath, 'utf8'));
      return memoriesData.memories.filter((memory) => memory.userId === userId && memory.date === date);
    } catch (error) {
      console.error('Error reading memories JSON file:', error);
      return [];
    }
  },
  getMemoriesForAUserInADateRange(userId, startDate, endDate) {
    try {
      const memoriesData = JSON.parse(fs.readFileSync(memoryFilePath, 'utf8'));
      return memoriesData.memories.filter((memory) => memory.userId === userId && memory.date >= startDate && memory.date <= endDate);
    } catch (error) {
      console.error('Error reading memories JSON file:', error);
      return [];
    }
  },
  getMemoriesForAUserInALocation(userId, longitude, latitude) {
    try {
      const memoriesData = JSON.parse(fs.readFileSync(memoryFilePath, 'utf8'));
      return memoriesData.memories.filter((memory) => memory.userId === userId && memory.longitude === longitude && memory.latitude === latitude);
    } catch (error) {
      console.error('Error reading memories JSON file:', error);
      return [];
    }
  },
  getMemoriesForAUserInALocationRange(userId, longitude, latitude, range) {
    try {
      const memoriesData = JSON.parse(fs.readFileSync(memoryFilePath, 'utf8'));
      return memoriesData.memories.filter((memory) => memory.userId === userId && memory.longitude >= longitude - range && memory.longitude <= longitude + range && memory.latitude >= latitude - range && memory.latitude <= latitude + range);
    } catch (error) {
      console.error('Error reading memories JSON file:', error);
      return [];
    }
  },
};

module.exports = memoryService;
