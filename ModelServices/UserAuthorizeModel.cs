using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices
{
    public class UserAuthorizeModel
    {
        public string AccessToken = "access_token";

        public string User_Id = "user_id";

        public string Token { get; set; } // jwt token
        public string Role { get; set; } // user role
        public string Username { get; set; } // user name
        public string UserId { get; set; } // user id
        public string Message { get; set; }
        public HttpStatusCode StatusCode { get; set; }
    }
}
