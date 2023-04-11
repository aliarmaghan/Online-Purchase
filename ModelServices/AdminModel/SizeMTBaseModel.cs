using ModelServices.AdminModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class SizeMTBaseModel
    {
        public int Size_Id { get; set; }
        public string Size_Type { get; set; }
        public bool IS_ACTIVE { get; set; }
        public string USERID { get; set; }
        public List<SizeMTModel> sizeMTModels { get; set; }
    }
}
