const Memory = class {
  constructor(id, userId, title, description, date, longitude, latitude, note, city) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.date = date;
    this.longitude = longitude;
    this.latitude = latitude;
    this.note = note > 5 ? 5 : note;
    this.city = city;
  }

  static fromJson(json) {
    return new Memory(json.id, json.userId, json.title, json.description, json.date, json.longitude, json.latitude, json.note, json.city);
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
      note: memory.note,
      city: memory.city,
    };
  }
};

module.exports = Memory;
