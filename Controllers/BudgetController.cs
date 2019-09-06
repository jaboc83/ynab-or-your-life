using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using YNABOrYourLife.Models;
using YNAB.SDK;
using YNAB.SDK.Model;

namespace YNABOrYourLife.Controllers
{
  public class BudgetController : Controller
  {
    private API ynabApi;
    public BudgetController(IOptionsMonitor<YNABOptions> options) {
    }

    [HttpGet]
    public async Task<IActionResult> Index([FromQuery(Name="access_token")] string token)
    {
      ynabApi = new API(token);
      var budgets = (await ynabApi.Budgets.GetBudgetsAsync()).Data.Budgets;
      ViewData.Add("AccessToken", token);
      return View(budgets);
    }

    [HttpGet]
    [HttpPost]
    [Route("Budget/{budgetId}")]
    public async Task<IActionResult> Calculate(Guid budgetId, string wage, [FromQuery(Name="access_token")] string token, [FromQuery(Name="currency_symbol")] string currencySymbol)
    {
      ynabApi = new API(token);
      var month = (await ynabApi.Months.GetBudgetMonthAsync(budgetId.ToString(), DateTime.Parse(Utils.GetCurrentMonthInISOFormat()))).Data.Month;
      ViewData.Add("AccessToken", token);
      ViewData.Add("CurrencySymbol", currencySymbol);
      if(wage != null)
      {
        ViewData.Add("Wage", double.Parse(wage));
      }
      return View(month);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
  }
}
