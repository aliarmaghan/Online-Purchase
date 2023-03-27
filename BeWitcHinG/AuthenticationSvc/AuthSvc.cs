using BeWitcHinG.App_Start;
using BeWitcHinG.Models;
using Microsoft.AspNet.Identity.EntityFramework;
//using Microsoft.Extensions.DependencyInjection;
using Microsoft.Owin.Security.DataProtection;
using ModelServices;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace bewitching.AuthenticationSvc
{
    public class AuthSvc
    {
        //private ApplicationSignInManager _signInManager;
        //private ApplicationUserManager _userManager;
        private readonly IServiceProvider _provider;

        public AuthSvc()
        {


        }
        public async Task<UserAuthorizeModel> AuthorizeUser(string email, string password)
        {

            var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {

                return CreateErrorResponseToken("Request Not Supported", HttpStatusCode.Unauthorized);
            }
            var roles = await userManager.GetRolesAsync(user.Id);

            //if (roles.FirstOrDefault() != "Admin")
            //{
            //    return CreateErrorResponseToken("Request Not Supported", HttpStatusCode.Unauthorized);
            //}

            var checkPassword = await userManager.CheckPasswordAsync(user, password);
            if (!checkPassword)
            {
                return CreateErrorResponseToken("Request Not Supported", HttpStatusCode.Unauthorized);
            }

            var auth = await GenerateToken(user.Id);
            return auth;
        }

        public async Task<UserAuthorizeModel> GenerateToken(string userId)
        {
            byte[] iv = new byte[16];
            byte[] array;
            await Task.Delay(0);
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes("BeW!t@h!ng4017011644374adreen401");
                aes.IV = iv;

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
                        {
                            streamWriter.Write(userId);
                        }

                        array = memoryStream.ToArray();
                    }
                }
            }

            var auth = new UserAuthorizeModel
            {
                UserId = Convert.ToBase64String(array),
                Message = "Login In Successfully",
                StatusCode = HttpStatusCode.OK

            };

            return auth;
        }

        public string DecryptToken(string userId)
        {
            try
            {
                byte[] iv = new byte[16];
                byte[] buffer = Convert.FromBase64String(userId);

                using (Aes aes = Aes.Create())
                {
                    aes.Key = Encoding.UTF8.GetBytes("BeW!t@h!ng4017011644374adreen401");
                    aes.IV = iv;
                    ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                    using (MemoryStream memoryStream = new MemoryStream(buffer))
                    {
                        using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
                            {
                                return streamReader.ReadToEnd();
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {

                return string.Empty;
            }

           
        }
        private static UserAuthorizeModel CreateErrorResponseToken(string errorMessage, HttpStatusCode statusCode)
        {
            var errorToken = new UserAuthorizeModel
            {
                Token = null,
                Username = null,
                Role = null,
                UserId = null,
                Message = errorMessage,
                StatusCode = statusCode
            };

            return errorToken;
        }
    }
}