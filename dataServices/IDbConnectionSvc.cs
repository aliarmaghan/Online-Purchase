using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace dataServices
{
    public interface IDbConnectionSvc
    {

        SqlConnection GetConnection();
    }
}
