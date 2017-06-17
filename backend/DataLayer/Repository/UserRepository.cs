using DataLayer.Session;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Repository {
    public class UserRepository {

        private static MongoSession _session;

        public UserRepository() {
            _session = new MongoSession();
            _session.Connect();
        }

        public void Delete(string Id) {
            _session.Delete<User>(us => us.Id == Id);
        }

        public List<User> Find() {
            return _session.Find<User>(us => true);
        }

        public void InsertOne(User user) {
            _session.InsertOne(user);
        }

        public void ReplaceOne(string Id, User user) {
            _session.ReplaceOne(us => us.Id == Id, user);
        }
    }
}
