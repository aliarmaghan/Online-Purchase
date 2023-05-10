using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class UserListBaseModel
    {
        public string USERNAME { get; set; }
        public string EMAIL { get; set; }

        public List<UserListModel> userlists { get; set; }
    }
}
