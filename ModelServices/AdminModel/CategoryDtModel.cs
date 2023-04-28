using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModalServices.AdminModel
{
   public class CategoryDtModel
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Please enter item name")]
        public string ITEM_NAME { get; set; }
        [Required(ErrorMessage = "Please enter item code")]
        public string CODE { get; set; }
        public int REF_CATEGORY { get; set; }
        public bool IS_ACTIVE { get; set; }
        public string CATEGORY_NAME { get; set; }
        public string MODIFIED_BY { get; set; }
        public string MODIFIED_DATE { get; set; }
        public string USERID { get; set; }
    }
}
