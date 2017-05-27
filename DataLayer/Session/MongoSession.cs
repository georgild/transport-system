using Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Session {
    public class MongoSession {

        protected static IMongoClient _client;
        protected static IMongoDatabase _mainDb;
        protected static MongoClientSettings _settings;

        protected static Dictionary<string, string> _collections;

        public MongoSession() {
            _settings = new MongoClientSettings() {
                Server = new MongoServerAddress("localhost", 27017) // TODO should be configurable
            };
            _collections = new Dictionary<string, string> {
                { typeof(User).Name, "users" },
                { typeof(Company).Name, "companies" },
                { typeof(Route).Name, "bus_routes" }
            };
        }

        public void Connect() {
            _client = new MongoClient(_settings);
            _mainDb = _client.GetDatabase("main"); // TODO should be configurable
        }

        public void Delete<T>(Expression<Func<T, bool>> filter) {
            var collection = _mainDb.GetCollection<T>(_collections[typeof(T).Name]);
            collection.DeleteMany(filter);
        }

        public List<T> Find<T>(Expression<Func<T, bool>> filter) {
            var collection = _mainDb.GetCollection<T>(_collections[typeof(T).Name]);
            return collection.Find(filter).ToList();
        }

        public void InsertOne<T>(T item) {
            var collection = _mainDb.GetCollection<T>(_collections[typeof(T).Name]);
            collection.InsertOne(item);
        }

        public void ReplaceOne<T>(Expression<Func<T, bool>> query, T item) {
            var collection = _mainDb.GetCollection<T>(_collections[typeof(T).Name]);
            collection.ReplaceOne(query, item);
        }
    }
}
