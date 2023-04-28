using ModelServices.AdminModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModalServices.AdminModel
{
    public class CategoryDtBaseModel
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Please enter item name")]
        public string ITEM_NAME { get; set; }
        [Required(ErrorMessage = "Please enter item code")]
        public string CODE { get; set; }
        public bool IS_ACTIVE { get; set; }
        [Required(ErrorMessage = "Please select Category")]
        public int CATEGORYID { get; set; }
        public string USERID { get; set; }
        public string CATEGORY_NAME { get; set; }


        public List<CategoryModel> categoryModels { get; set; }
        public List<CategoryDtModel> categList { get; set; }
    }
}
