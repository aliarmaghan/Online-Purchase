using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using dataServices;
using System.Linq;
using ModelServices.AdminModel;
using BusinessService.Helper;

namespace BusinessService
{
    public class UserProfileSvc
    {
        DbSqlFunctionSvc _sqlFunctionSvc = new DbSqlFunctionSvc();
        ConverDataTableToGenericObject genericObject = new ConverDataTableToGenericObject();
        ConvertDataTableToGenericList genericList = new ConvertDataTableToGenericList();
        public async Task<UserProfileModel> GetUserProfileData(string userId)
        {
            await Task.Delay(0);
            DataSet ds = new DataSet();
            try
            {
                string StoreProcedureName = "PROC_GET_USER_PROFILE_DATA";
                SqlParameter[] prms = new SqlParameter[]
                   {
                    _sqlFunctionSvc.CreateParameter("@USER_ID",SqlDbType.NVarChar,-1,ParameterDirection.Input,userId),
                    _sqlFunctionSvc.CreateParameter("@MESSAGE",SqlDbType.VarChar,-1,ParameterDirection.Output,DBNull.Value),
                    _sqlFunctionSvc.CreateParameter("@RESPONSE",SqlDbType.Bit,1,ParameterDirection.Output,DBNull.Value),

                   };
                ds = _sqlFunctionSvc.ExecProcDataSet(StoreProcedureName, ref prms);

                DataRow drObj = ds.Tables[0].AsEnumerable().FirstOrDefault();
                DataRow drObjForAdd = ds.Tables[1].AsEnumerable().FirstOrDefault();

                var model = genericObject.CreateGenericObject<UserProfileModel>(drObj);
                var addressModel = genericObject.CreateGenericObject<UserAddressModel>(drObjForAdd);

                //var addressModel = genericList.GenerateGenericList<UserAddressModel>(ds.Tables[1]);

                model.AddressModel = addressModel;

                return model;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<bool> UpdateUserProfileData(String jsonData)
        {
            await Task.Delay(0);
            DataTable dt = new DataTable();
            try
            {
                string StoreProcedureName = "PROC_UPDATE_USER_PROFILE_DATA";
                SqlParameter[] prms = new SqlParameter[]
                   {
                    _sqlFunctionSvc.CreateParameter("@ProfilJson",SqlDbType.NVarChar,-1,ParameterDirection.Input,jsonData),
                    _sqlFunctionSvc.CreateParameter("@MESSAGE",SqlDbType.VarChar,-1,ParameterDirection.Output,DBNull.Value),
                    _sqlFunctionSvc.CreateParameter("@RESPONSE",SqlDbType.Bit,1,ParameterDirection.Output,DBNull.Value),

                   };
                dt = _sqlFunctionSvc.ExecProcDataTable(StoreProcedureName, ref prms);

                return true;
            }
            catch (Exception )
            {
                return false;
            }
        }

    } 
    
}
