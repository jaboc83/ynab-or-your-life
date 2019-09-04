# YNAB Or Your Life
![YNAB or Your Life Preview](/YNABOrYourLifePreview.png)


This is a simple app that allows you to view your budgeted amounts for the current
month in work hours using the formula outlined in "Your Money or Your Life"

## To Run

To use this client, you must [obtain an access token][accesstoken] from the
[My Account][myaccount] area of the YNAB web application.

- Make sure you have .net core 2.2 installed.
- Clone the repo and add the token you obtained in place of the `YOUR_TOKEN_HERE`
text inside the `appsettings.json` file
- run `dotnet run` from a terminal inside the ynab-or-your-life root directory
- Open a browser and navigate to https://localhost:5001

## License

Copyright (c) 2019 Jake Moening

Licensed under the Apache-2.0 license

[openapi]: https://github.com/OpenAPITools/openapi-generator
[ynabapi]: https://api.youneedabudget.com
[accesstoken]: https://api.youneedabudget.com/#authentication-overview
[myaccount]: https://app.youneedabudget.com/settings
[examples]: https://github.com/jaboc83/ynab-sdk-dotnetcore/tree/master/YNAB.SDK/examples
[docs]: https://github.com/jaboc83/ynab-sdk-dotnetcore/tree/master/docs
