using BusinessService.Helper;
using dataServices;
using ModelServices.AdminModel;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessService
{
    public class SizeMTSvc
    {

        DbSqlFunctionSvc _sqlFunctionSvc = new DbSqlFunctionSvc();
        ConverDataTableToGenericObject genericObject = new ConverDataTableToGenericObject();
        ConvertDataTableToGenericList genericList = new ConvertDataTableToGenericList();

        public async Task<List<SizeMTModel>> GetSizeMTList(int? id)
        {
            await Task.Delay(0);
            DataTable dt = new DataTable();
            try
            {
                string StoreProcedureName = "GetSizeMTList";
                SqlParameter[] prms = new SqlParameter[]
                   {
                    _sqlFunctionSvc.CreateParameter("@Size_ID",SqlDbType.NVarChar,-1,ParameterDirection.Input,id),
                    _sqlFunctionSvc.CreateParameter("@MESSAGE",SqlDbType.VarChar,-1,ParameterDirection.Output,DBNull.Value),
                    _sqlFunctionSvc.CreateParameter("@RESPONSE",SqlDbType.Bit,1,ParameterDirection.Output,DBNull.Value),

                   };
                dt = _sqlFunctionSvc.ExecProcDataTable(StoreProcedureName, ref prms);

                var sizeMtList = genericList.GenerateGenericList<SizeMTModel>(dt);


                return sizeMtList;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task<bool> AddSizeMT(string jsonData)
        {
            await Task.Delay(0);
            DataTable dt = new DataTable();
            try
            {
                string StoreProcedureName = "PROC_ADD_CATEGORY";
                SqlParameter[] prms = new SqlParameter[]
                   {
                    _sqlFunctionSvc.CreateParameter("@CategJson",SqlDbType.NVarChar,-1,ParameterDirection.Input,jsonData),
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
        public async Task<bool> DeleteSizeMT(int id)
        {

            try
            {
                await Task.Delay(0);
                string query = "Delete from Size_MT where Size_ID =" + id + "";


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
