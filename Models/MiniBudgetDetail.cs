using System.Collections.Generic;

namespace YNABOrYourLife.Models
{
  public class MiniBudgetDetail
  {
    public string Id { get; set; }
    public IEnumerable<MiniCategory> Categories { get; set; }
  }
}
