using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class BrandBaseModel
    {
        public int BRAND_ID { get; set; }
        public string BRAND_NAME { get; set; }
        public string BRAND_CODE { get; set; }
        public bool IS_ACTIVE { get; set; }
        public List <BrandModel> brandList { get; set; }
    }
}
