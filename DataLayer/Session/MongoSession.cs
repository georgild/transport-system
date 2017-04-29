using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Session {
    public class MongoSession {

        protected static IMongoClient _client;
        protected static IMongoDatabase _mainDb;
        protected static MongoClientSettings _settings;

        public MongoSession() {
            _settings = new MongoClientSettings();
            _settings.Server = new MongoServerAddress("localhost", 27017); // TODO should be configurable
        }

        public void Connect() {
            _client = new MongoClient(_settings);
            _mainDb = _client.GetDatabase("main"); // TODO should be configurable
        }

        public async void InsertOneAsync<T>(T item) {
            var collection = _mainDb.GetCollection<T>("users");
            await collection.InsertOneAsync(item);
        }
    }
}
