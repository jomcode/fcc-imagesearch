function MemoryStorage() {
  this.data = [];
}

MemoryStorage.prototype.set = function create(query) {
  const id = this.data.length;
  this.data.push({ query, time: new Date(Date.now()).toUTCString() });
  return id;
};

MemoryStorage.prototype.getAll = function getAll() {
  return this.data.slice(0);
};

const storage = new MemoryStorage();

module.exports.MemoryStorage = storage;
