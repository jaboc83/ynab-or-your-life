using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using YNAB.SDK;
using YNABOrYourLife.Models;

namespace YNABOrYourLife.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BudgetController : ControllerBase
  {
    private API ynabApi;
    public BudgetController(IOptionsMonitor<YNABOptions> options) {}

    [HttpGet]
    public async Task<IEnumerable<MiniBudgetSummary>> Get(string accessToken)
    {
      ynabApi = new API(accessToken);
      var budgets = (await ynabApi.Budgets.GetBudgetsAsync()).Data.Budgets.Select(b =>
        new MiniBudgetSummary {
          Id = b.Id.ToString(),
          Name = b.Name,
          CurrencySymbol = b.CurrencyFormat.CurrencySymbol
        }
      );
      return budgets;
    }

    [HttpGet("{budgetId}")]
    public async Task<MiniBudgetDetail> GetBudgetDetail(string budgetId, string accessToken, string currencySymbol)
    {
      var ignoredCategories = new string[] {"To be Budgeted", "Deferred Income SubCategory", "Uncategorized" };
      ynabApi = new API(accessToken);
      var month = (await ynabApi.Months.GetBudgetMonthAsync(budgetId.ToString(), DateTime.Parse(Utils.GetCurrentMonthInISOFormat()))).Data.Month;
      return new MiniBudgetDetail
      {
        Id = budgetId,
        Categories = month.Categories.Where(c => !c.Hidden && !ignoredCategories.Contains(c.Name)).Select(c =>
          new MiniCategory
          {
            Id = c.Id.ToString(),
            Name = c.Name,
            Budgeted = float.Parse(Utils.ConvertMilliUnitsToCurrencyAmount(c.Budgeted))
          }
        )
      };
    }
  }
}
