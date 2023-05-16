using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class UserListBaseModel
    {
        public string USERID { get; set; }
        public string ROLE { get; set; }
        public string ROLE_ID { get; set; }
        public string USERNAME { get; set; }
        public string EMAIL { get; set; }
        public string PASSWORD { get; set; }
        public string PHONENUMBER { get; set; }
        public int ID { get; set; }
        public int STATEID { get; set; }
        public int CITYID { get; set; }
        public string ADDRESS { get; set; }
        public string LANDMARK { get; set; }
        public string PINCODE { get; set; }

        public List<UserListModel> userlists { get; set; }
        //public UserAddressModel LISTOFADDRESS { get; set; }
        public List<CountryModel> countryModels { get; set; }
        public List<StateModel> stateModels { get; set; }
        public List<CityModel> cityModels { get; set; }
        public List<RoleModel> roleModels { get; set; }
    }
}
