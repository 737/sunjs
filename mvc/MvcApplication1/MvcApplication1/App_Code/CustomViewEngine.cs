using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Webapp
{
    public class CustomViewEngine : RazorViewEngine
    {
        /// <summary>
        /// debug模式搜索Views路径
        /// </summary>
        private string[] debugSearchLocations = new string[] 
        {
            "~/src/Views/{1}/{0}.cshtml",
            "~/src/Views/{1}/{0}.vbhtml",
            "~/src/Views/Shared/{0}.cshtml",
            "~/src/Views/Shared/{0}.vbhtml"
        };

        /// <summary>
        /// release模式搜索Views路径
        /// </summary>
        private string[] releaseSearchLocations = new string[] 
        {
            "~/dest/Views/{1}/{0}.cshtml",
            "~/dest/Views/{1}/{0}.vbhtml",
            "~/dest/Views/Shared/{0}.cshtml",
            "~/dest/Views/Shared/{0}.vbhtml"
        };


        public override ViewEngineResult FindView(ControllerContext controllerContext, string viewName, string masterName, bool useCache)
        {
            if (controllerContext.HttpContext.Request.QueryString["debug"] == "1")
            {
                this.ViewLocationFormats = debugSearchLocations;
            }
            else
            {
                this.ViewLocationFormats = releaseSearchLocations;
            }

            this.ViewLocationFormats = debugSearchLocations;


            this.PartialViewLocationFormats = this.ViewLocationFormats;

            return base.FindView(controllerContext, viewName, masterName, useCache);
        }

    }
}
