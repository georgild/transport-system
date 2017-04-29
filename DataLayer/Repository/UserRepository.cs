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

        public User GetUser(string name) {
            return null;
        }
    }
}
