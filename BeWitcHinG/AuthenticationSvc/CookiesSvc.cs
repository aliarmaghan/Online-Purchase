using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bewitching.AuthenticationSvc
{
    public class CookiesSvc
    {
        public void SetCookie(string key, string value, int? expireTime)
        {

            HttpCookie cookie = new HttpCookie(key);
            cookie.Value = value;
            cookie.Expires = DateTime.Now.AddMinutes(expireTime.Value);
            cookie.Secure = true;
            cookie.HttpOnly = true;
            cookie.SameSite = SameSiteMode.Strict;
            HttpContext.Current.Response.SetCookie(cookie);
        }

        public void DeleteCookie(string key)
        {

            HttpContext.Current.Response.Cookies[key].Expires = DateTime.Now.AddDays(-1);

        }

        public void DeleteAllCookies(IEnumerable<string> cookiesToDelete)
        {
            foreach (var key in cookiesToDelete)
            {
                HttpContext.Current.Response.Cookies.Remove(key);
            }
        }

        public string GetCookiesValue(string key)
        {
            return HttpContext.Current.Request.Cookies[key].Value;
        }
    }
}