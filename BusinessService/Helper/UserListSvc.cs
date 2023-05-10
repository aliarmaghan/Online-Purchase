using dataServices;
using ModelServices.AdminModel;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessService.Helper
{
    public class UserListSvc
    {
        DbSqlFunctionSvc _sqlFunctionSvc = new DbSqlFunctionSvc();
        ConverDataTableToGenericObject genericObject = new ConverDataTableToGenericObject();
        ConvertDataTableToGenericList genericList = new ConvertDataTableToGenericList();

        public async Task<List<UserListModel>> GetUserList(int? id)
        {
            await Task.Delay(0);
            DataTable dt = new DataTable();
            try
            {
                string StoreProcedureName = "GETUSERLIST";
                SqlParameter[] prms = new SqlParameter[]
                   {
                    _sqlFunctionSvc.CreateParameter("@USER_ID",SqlDbType.NVarChar,-1,ParameterDirection.Input,id),
                    _sqlFunctionSvc.CreateParameter("@MESSAGE",SqlDbType.VarChar,-1,ParameterDirection.Output,DBNull.Value),
                    _sqlFunctionSvc.CreateParameter("@RESPONSE",SqlDbType.Bit,1,ParameterDirection.Output,DBNull.Value),

                   };
                dt = _sqlFunctionSvc.ExecProcDataTable(StoreProcedureName, ref prms);

                var userList = genericList.GenerateGenericList<UserListModel>(dt);


                return userList;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
