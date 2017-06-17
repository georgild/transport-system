using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Models {

    public class CompanyOffice {

        public string City { get; set; }

        public string Address { get; set; }

        public string TelephoneNumber { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        
    }

    public class Company {

        [BsonIgnoreIfNull]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<CompanyOffice> Offices { get; set; }
    }
}
