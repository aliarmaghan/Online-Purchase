using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class CouponModel
    {
        public int COUPON_ID { get; set; }
        public string COUPON_NAME { get; set; }
        public string REMARKS { get; set; }
        public bool IS_ACTIVE { get; set; }
        public string EXP_FROM { get; set; }
        public string EXP_TO { get; set; }
        public string CREATED_DATE { get; set; }
        public string CREATED_BY { get; set; }
        public string MODIFIED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
        public string USERID { get; set; }
    }
}
