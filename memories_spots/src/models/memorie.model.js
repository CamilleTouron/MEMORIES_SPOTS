const Memory = class {
  constructor(id, userId, title, description, date, longitude, latitude) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.date = date;
    this.longitude = longitude;
    this.latitude = latitude;
  }

  static fromJson(json) {
    return new Memory(json.id, json.userId, json.title, json.description, json.date, json.longitude, json.latitude);
  }

  static toJson(memory) {
    return {
      id: memory.id,
      userId: memory.userId,
      title: memory.title,
      description: memory.description,
      date: memory.date,
      longitude: memory.longitude,
      latitude: memory.latitude,
    };
  }
};

module.exports = Memory;
