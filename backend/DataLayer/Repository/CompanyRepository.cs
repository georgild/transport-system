using DataLayer.Session;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Repository {
    public class CompanyRepository {

        private static MongoSession _session;

        public CompanyRepository() {
            _session = new MongoSession();
            _session.Connect();
        }

        public void Delete(string Id) {
            _session.Delete<Company>(comp => comp.Id == Id);
        }

        public List<Company> Find() {
            return _session.Find<Company>(comp => true);
        }

        public void InsertOne(Company company) {
            _session.InsertOne(company);
        }

        public void ReplaceOne(string Id, Company company) {
            _session.ReplaceOne(comp => comp.Id == Id, company);
        }
    }
}