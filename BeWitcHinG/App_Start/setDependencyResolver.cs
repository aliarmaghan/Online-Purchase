using System;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BeWitcHinG.App_Start
{
    public class setDependencyResolver : IDependencyResolver
    {
        protected IServiceProvider serviceProvider;

        public setDependencyResolver(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }
        public object GetService(Type serviceType)
        {
            return this.serviceProvider.GetService(serviceType);
        }
        public IEnumerable<object> GetServices(Type serviceType)
        {
            return this.serviceProvider.GetServices(serviceType);
        }
    }
}