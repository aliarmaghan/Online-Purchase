using BusinessService.Helper;
using ModalServices.AdminModel;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dataServices;

namespace BusinessService
{
    public class CategDTSvc
    {
        DbSqlFunctionSvc _sqlFunctionSvc = new DbSqlFunctionSvc();
        ConverDataTableToGenericObject genericObject = new ConverDataTableToGenericObject();
        ConvertDataTableToGenericList genericList = new ConvertDataTableToGenericList();


        public async Task<List<CategoryDtModel>> GetCategoryDT(int? id)
        {
            await Task.Delay(0);
            DataTable dt = new DataTable();
            try
            {
                string StoreProcedureName = "GET_CATEGORYDT_DETAILS";
                SqlParameter[] prms = new SqlParameter[]
                   {
                    _sqlFunctionSvc.CreateParameter("@ID",SqlDbType.Int,-1,ParameterDirection.Input,id),
                    _sqlFunctionSvc.CreateParameter("@MESSAGE",SqlDbType.VarChar,-1,ParameterDirection.Output,DBNull.Value),
                    _sqlFunctionSvc.CreateParameter("@RESPONSE",SqlDbType.Bit,1,ParameterDirection.Output,DBNull.Value),

                   };
                dt = _sqlFunctionSvc.ExecProcDataTable(StoreProcedureName, ref prms);

                var categList = genericList.GenerateGenericList<CategoryDtModel>(dt);


                return categList;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<bool> AddCategoryDetails(string jsonData)
        {
            await Task.Delay(0);
            DataTable dt = new DataTable();
            try
            {
                string StoreProcedureName = "PROC_ADD_CATEGORY_DT";
                SqlParameter[] prms = new SqlParameter[]
                   {
                    _sqlFunctionSvc.CreateParameter("@CategoryJason",SqlDbType.NVarChar,-1,ParameterDirection.Input,jsonData),
                    _sqlFunctionSvc.CreateParameter("@MESSAGE",SqlDbType.VarChar,-1,ParameterDirection.Output,DBNull.Value),
                    _sqlFunctionSvc.CreateParameter("@RESPONSE",SqlDbType.Bit,1,ParameterDirection.Output,DBNull.Value),

                   };

                dt = _sqlFunctionSvc.ExecProcDataTable(StoreProcedureName, ref prms);

                return true;

            }
            catch (Exception ex)
            {

                return false;
            }
        }

        public async Task<bool> DeleteCategoryDetails(int id)
        {

            try
            {
                await Task.Delay(0);
                string query = "Delete from category_dt where ID =" + id + "";


                string result = _sqlFunctionSvc.ExecStrSingleValue(query);
                return true;

            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}
