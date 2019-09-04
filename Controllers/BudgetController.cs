using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using YNABOrYourLife.Models;
using YNAB.SDK;

namespace YNABOrYourLife.Controllers
{
  public class BudgetController : Controller
  {
    private readonly API _ynabApi;
    public BudgetController(IOptions<YNABOrYourLifeOptions> options) {
      _ynabApi = new API(options.Value.YNABToken);
    }
    public async Task<IActionResult> Index()
    {
      var lastBudgetModifiedId = (await _ynabApi.Budgets.GetBudgetsAsync()).Data.Budgets.OrderByDescending(x => x.LastModifiedOn).First().Id;
      var budget = (await _ynabApi.Budgets.GetBudgetByIdAsync(lastBudgetModifiedId.ToString())).Data.Budget;
      return View(budget);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
  }
}
