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
    public class MasterDataSvc
    {
        DbSqlFunctionSvc _sqlFunctionSvc = new DbSqlFunctionSvc();
        ConverDataTableToGenericObject genericObject = new ConverDataTableToGenericObject();
        ConvertDataTableToGenericList genericList = new ConvertDataTableToGenericList();


        public async Task<List<CountryModel>> CountryList()
        {
            await Task.Delay(0);
            DataSet ds = new DataSet();
            try
            {
                string StoreProcedureName = "GET_COUNTRY_STATE_CITY_LIST";
                SqlParameter[] prms = new SqlParameter[] { };

                ds = _sqlFunctionSvc.ExecProcDataSet(StoreProcedureName, ref prms);

                var countryList = genericList.GenerateGenericList<CountryModel>(ds.Tables[0]);


                return countryList;
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        public async Task<List<StateModel>> StateList()
        {
            await Task.Delay(0);
            DataSet ds = new DataSet();
            try
            {
                string StoreProcedureName = "GET_COUNTRY_STATE_CITY_LIST";
                SqlParameter[] prms = new SqlParameter[] { };

                ds = _sqlFunctionSvc.ExecProcDataSet(StoreProcedureName, ref prms);

                var stateList = genericList.GenerateGenericList<StateModel>(ds.Tables[1]);


                return stateList;
            }
            catch (Exception ex)
            {

                throw;
            }

        }
        public async Task<List<CityModel>> CityList()
        {
            await Task.Delay(0);
            DataSet ds = new DataSet();
            try
            {
                string StoreProcedureName = "GET_COUNTRY_STATE_CITY_LIST";
                SqlParameter[] prms = new SqlParameter[] { };

                ds = _sqlFunctionSvc.ExecProcDataSet(StoreProcedureName, ref prms);

                var cityList = genericList.GenerateGenericList<CityModel>(ds.Tables[2]);


                return cityList;
            }
            catch (Exception ex)
            {

                throw;
            }

        }
    }
}
