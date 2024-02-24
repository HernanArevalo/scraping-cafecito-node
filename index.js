const { chromium } = require('playwright')

const getCafecitoData = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://cafecito.app/canvic')

  await page.waitForSelector('.homeProfile_rightContainer__lm22m')

  const coffeeDonations = await page.$$('.homeProfile_rightContainer__lm22m .coffee_coffeeContainer__Xeycb')
  const lastDonation = coffeeDonations[2]

  // donor
  const donorNameElement = await lastDonation.$('.coffee_name__93o6l')
  const donorName = donorNameElement ? await donorNameElement.innerText() : 'Anónimo'

  // donation
  const donatedCoffeesElement = await lastDonation.$('.coffee_countCoffees__WQtss')
  const donatedCoffeesText = donatedCoffeesElement ? await donatedCoffeesElement.innerText() : null
  const donatedCoffees = donatedCoffeesText ? donatedCoffeesText.match(/\d+/)[0] : null

  // message
  let messageElement = await lastDonation.$('.coffee_text__fLzF1')
  if (messageElement == null) {
    messageElement = await lastDonation.$('.coffee_answer__YoEcE')
  }
  const message = messageElement ? await messageElement.innerText() : null

  // Crea un objeto con la información obtenida
  const donationInfo = {
    donorName,
    donatedCoffees,
    message
  }

  // Muestra el objeto por consola
  console.log(donationInfo)

  await browser.close()
}

getCafecitoData()
