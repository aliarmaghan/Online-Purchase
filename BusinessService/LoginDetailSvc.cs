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
using ModelServices;

namespace BusinessService
{
    public class LoginDetailSvc
    {
        DbSqlFunctionSvc _sqlFunctionSvc = new DbSqlFunctionSvc();
        ConverDataTableToGenericObject genericObject = new ConverDataTableToGenericObject();
        ConvertDataTableToGenericList genericList = new ConvertDataTableToGenericList();

        public async Task <LoginDetailModel> GetLoginDetails(string id)
        {
            await Task.Delay(0);
            DataTable dt = new DataTable();
            try
            {
                string StoreProcedureName = "GETLOGINLIST";
                SqlParameter[] prms = new SqlParameter[]
                   {
                    _sqlFunctionSvc.CreateParameter("@USER_ID",SqlDbType.NVarChar,-1,ParameterDirection.Input,id),
                    _sqlFunctionSvc.CreateParameter("@MESSAGE",SqlDbType.VarChar,-1,ParameterDirection.Output,DBNull.Value),
                    _sqlFunctionSvc.CreateParameter("@RESPONSE",SqlDbType.Bit,1,ParameterDirection.Output,DBNull.Value),

                   };
                dt = _sqlFunctionSvc.ExecProcDataTable(StoreProcedureName, ref prms);
                // To Select single data of dt
                DataRow dataRow = dt.AsEnumerable().FirstOrDefault();

                //var loginDetails = genericList.GenerateGenericList<LoginDetailModel>(dt);
                var loginDetails = genericObject.CreateGenericObject<LoginDetailModel>(dataRow);





                return loginDetails;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
