using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class CouponBaseModel
    {
        public int COUPON_ID { get; set; }
        [Required(ErrorMessage = "Please enter coupon name")]
        public string COUPON_NAME { get; set; }
        [Required(ErrorMessage = "Please select start date")]
        public string EXP_FROM { get; set; }
        [Required(ErrorMessage = "Please select end date")]
        public string EXP_TO { get; set; }
        public bool IS_ACTIVE { get; set; }
        public string USERID { get; set; }
        [Required(ErrorMessage = "Please enter remarks")]
        public string REMARKS { get; set; }

        public List<CouponModel> Coupons { get; set; }
    }
}
