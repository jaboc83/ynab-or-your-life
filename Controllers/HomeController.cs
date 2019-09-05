using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YNABOrYourLife.Models;

namespace YNABOrYourLife.Controllers
{
  public class HomeController : Controller
  {
    public IActionResult Index()
    {
      ViewData.Add("ClientId", "63b4364465cb3e94af96e1475d986911d55cd24634b583787257ddb546f78a7c");
      return View();
    }
    public IActionResult Privacy()
    {
      return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
  }
}
