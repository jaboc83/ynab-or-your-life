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
    private readonly API _ynabApi;
    public BudgetController(IOptionsMonitor<YNABOptions> options) {
      _ynabApi = new API(options.CurrentValue.YNABToken);
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
      var budgets = (await _ynabApi.Budgets.GetBudgetsAsync()).Data.Budgets;
      return View(budgets);
    }

    [HttpGet]
    [HttpPost]
    [Route("Budget/{budgetId}")]
    public async Task<IActionResult> Calculate(Guid budgetId, string wage)
    {
      var budget = (await _ynabApi.Budgets.GetBudgetByIdAsync(budgetId.ToString())).Data.Budget;
      if(wage != null)
      {
        ViewData.Add("Wage", double.Parse(wage));
      }
      return View(budget);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
  }
}
